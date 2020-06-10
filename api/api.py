import time
from flask import request, make_response, Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from .sample_data import sample_users
from sqlalchemy import or_
# TODO: Move model into its own fileImports for model class
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean
from flask_appbuilder import Model

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
           'first_name':    self.first_name,
           'last_name': self.last_name,
           'date': self.date,
           'signed_out': self.signed_out,
       }

db.drop_all()
db.create_all()
db.session.commit()

# TODO (cborsting): Figure out the best place to put this sample data, move this to app creation part
@app.route('/sample_data', methods=['GET'])
def create_visitors():
    for visitor in sample_users:
        print(visitor.first_name, visitor.last_name, visitor.notes)
        new_vistor(visitor.first_name, visitor.last_name, visitor.notes)
    return jsonify(json_list=[visitor.serialize for visitor in Visitor.query.all()])


@app.route('/entries', methods=['GET', 'POST', 'PATCH'])
def login():
    # TODO (insert try / except here)
    if request.method == 'POST':
        try:
            first_name = request.args.get('first_name')
            last_name = request.args.get('last_name')
            notes = request.args.get('notes')
            new_vistor(first_name, last_name, notes)
        except:
            return (jsonify(success=False))
        return (jsonify(success=True))
    elif request.method == 'GET':
        return get_visitors()
    elif request.method == 'PATCH':
        return update_visitor()
    return 400 # TODO Proper way to return 400


def get_visitors():
    """
    Searchs through all visitors in database and returns serialized result.
    Possible search parameters:
        first_name
        last_name
        signed_out status
    """
    
    first_name = request.args.get("first_name")
    last_name = request.args.get("last_name")
    signed_out = request.args.get("signed_out")
    visitors = []
    if not first_name or last_name or signed_out:
        vistors = Visitor.query.all()
    elif first_name or last_name:
        vistors = Visitor.query.filter(Visitor.first_name.like(first_name) | Visitor.last_name.like(last_name)).all()
    else:
        visitors = Visitor.query.filter(Visitor.signed_out == signed_out).all()
    return jsonify(Vistor.serialize(vistor) for vistor in vistor)

def new_vistor(first_name, last_name, notes):
    # Error handling here for None created
    new_visitor = Visitor(
                    first_name=first_name,
                    last_name=last_name,
                    notes=notes,
                    signed_out=False
    )
    db.session.add(new_visitor)
    db.session.commit()

def update_visitor():
    # Add error handling here
    vistor_id = request.args.get('id')
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    notes = request.args.get('notes')
    signed_out = request.args.get('signed_out')
    date = request.args.get('date')

    # TODO (cborsting): Is there a cleaner way to do this?
    # Error handling here for none found
    visitor_to_update = Visitor.query.filter_by(id=vistor_id).first()
    visitor_to_update.first_name = first_name
    visitor_to_update.last_name = last_name
    visitor_to_update.notes = notes
    visitor_to_update.date = date
    db.session.commit() 
    return (jsonify(success=True))
