from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os
import pdb

def create_test_app(db):
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dbdir/test.db'
    # Dynamically bind SQLAlchemy to application
    db.init_app(app)
    app.app_context().push() # this does the binding
    return app

# you can create another app context here, say for production
def create_production_app(db):
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////dbdir/prod.db"
    # Dynamically bind SQLAlchemy to application
    db.init_app(app)
    app.app_context().push()
    return app

db = SQLAlchemy()
if os.environ.get('FLASK_ENV') == 'TEST':
    app = create_test_app(db)
else:
    app = create_production_app(db)
