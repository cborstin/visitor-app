import time
from flask import request, make_response, Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
# from .sample_data import sample_users
from sqlalchemy import or_
# TODO: Move model into its own fileImports for model class
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean
from flask_appbuilder import Model
import ast
from sqlalchemy.ext.hybrid import hybrid_property

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


#TODO (Figure out how to move this)
class Visitor(db.Model):
    __tablename__ = 'visitors'
    id = db.Column(Integer,primary_key=True)
    # TODO (cborsting): See default values for unique
    first_name = db.Column(String(50), unique = False, nullable=False)
    last_name = db.Column(String(50), unique = False, nullable=False)
    date = db.Column(String(50), unique = False, nullable=True)
    notes = db.Column(String(50), unique = False, nullable=True)
    signed_out = db.Column(Boolean, unique = False, nullable=False)

    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id': self.id,
           'firstName':    self.first_name,
           'lastName': self.last_name,
           'notes': self.notes,
           'date': self.date,
           'isSignedOut': self.signed_out,
       }

    @hybrid_property
    def full_name(self):
        return self.first_name + " " +  self.last_name

db.create_all()
db.session.commit()

def get_visitor_response(visitors):
    return jsonify(visitors=[visitor.serialize for visitor in visitors], status="ok")

def get_error_response(err_msg):
    return jsonify(err_msg=err_msg, success=False)

# TODO (cborsting): Figure out the best place to put this sample data, move this to app creation part
@app.route('/sample_data', methods=['GET'])
def create_visitors():
    for visitor in sample_users:
        new_visitor(visitor.first_name, visitor.last_name, visitor.notes)
    return get_visitor_response(Visitor.query.all())


@app.route('/entries', methods=['GET', 'POST', 'PATCH'])
def process_entries():
    # TODO (insert try / except here)
    if request.method == 'POST':
        data = request.get_json(force=True)
        visitor = data["visitor"]
        first_name = visitor.get('firstName', None)
        last_name = visitor.get('lastName', None)
        notes = visitor.get('notes', None)
        return new_visitor(first_name, last_name, notes)
    elif request.method == 'GET':
        return get_visitors()
    elif request.method == 'PATCH':
        return update_visitor()
    return 400 # TODO Proper way to return 400


def get_visitors():
    """
    Searchs through all visitors in database and returns serialized result.
    Possible search parameters:
        name --> Substring matching any part of name
        signed_out --> Any user matches signed out status
    """
    
    name = request.args.get("name")
    signed_out = request.args.get("isSignedOut")
    visitors = Visitor.query

    if name and len(name) > 0:
        print(name)
        name_string = search = "%{}%".format(name)
        visitors = visitors.filter(Visitor.full_name.like(name_string)) 
    if signed_out == "true":
        print(signed_out)
        visitors = Visitor.query.filter(Visitor.signed_out == True)
    visitors = visitors.all()
    return get_visitor_response(visitors)

def new_visitor(first_name, last_name, notes):
    # Error handling here for None created
    new_visitor = Visitor(
                    first_name=first_name,
                    last_name=last_name,
                    notes=notes,
                    signed_out=False
    )
    db.session.add(new_visitor)
    db.session.commit()
    return get_visitor_response(Visitor.query.all())

def update_visitor():
    # Add error handling here

    #TODO: method to parse data
    data = request.get_json(force=True)
    visitor = data["visitor"]
    
    if not visitor:
        return get_error_response("No visitor data received")

    # TODO Figure out why these are returning None
    visitor_id = visitor.get('id', None)
    first_name = visitor.get('firstName', None)
    last_name = visitor.get('lastName', None)
    notes = visitor.get('notes', None)
    signed_out = visitor.get('isSignedOut', False)
    date = visitor.get('date', None)

    # TODO (cborsting): Is there a cleaner way to do this?
    # Error handling here for none found
    visitor_to_update = Visitor.query.filter_by(id=visitor_id).first()
    if not visitor_to_update:
        get_error_response("Visitor id not found")
    visitor_to_update.first_name = first_name
    visitor_to_update.last_name = last_name
    visitor_to_update.notes = notes
    visitor_to_update.date = date
    visitor_to_update.signed_out = signed_out
    db.session.commit() 
    return get_visitor_response(Visitor.query.all())
