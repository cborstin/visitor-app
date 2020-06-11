from flask import request, Flask, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from visitor import Visitor
from app import app, db

blueprint = Blueprint('app', __name__)

def get_visitor_response(visitors):
    return jsonify(visitors=[visitor.serialize for visitor in visitors], status="ok")

def get_error_response(err_msg):
    return jsonify(err_msg=err_msg, status="error")

@blueprint.route('/entries', methods=['GET', 'POST', 'PATCH'])
def process_entries():
    """
        Function that proccesses all calls to /entries. Valid methods are:
            GET --> Returns a list of visitors
            POST --> Creates a new visitor and returns the updated list of visitors
            PATCH --> Updates a visitor and returns the updated list of visitors
    """
    print(request)
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
    return 500


def get_visitors():
    """
        Searches the visitor data store. Allows optional request parameter(isSignedOut)
        which if set to true, only returns a list of signed out visitors
    """
    
    signed_out = request.args.get("isSignedOut")
    visitors = Visitor.query
    if signed_out == "true":
        visitors = Visitor.query.filter(Visitor.signed_out == True)
    visitors = visitors.all()
    return get_visitor_response(visitors)

def new_visitor(first_name, last_name, notes):
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
    data = request.get_json(force=True)
    visitor = data["visitor"]
    
    if not visitor:
        return get_error_response("No visitor data received")

    visitor_id = visitor.get('id', None)
    first_name = visitor.get('firstName', None)
    last_name = visitor.get('lastName', None)
    notes = visitor.get('notes', None)
    signed_out = visitor.get('isSignedOut', False)
    date = visitor.get('date', None)

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


db.create_all()
db.session.commit()
app.register_blueprint(blueprint)

