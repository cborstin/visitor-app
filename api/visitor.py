from app import db
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean
from flask_appbuilder import Model
from sqlalchemy.ext.hybrid import hybrid_property

class Visitor(db.Model):
    __tablename__ = 'visitors'
    id = db.Column(Integer, primary_key=True)
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



