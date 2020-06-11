from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os

def create_test_app(db):
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dbdir/test.db'
    db.init_app(app)
    app.app_context().push()
    return app

def create_production_app(db):
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///dbdir/prod.db'
    db.init_app(app)
    app.app_context().push()
    return app

db = SQLAlchemy()
if os.environ.get('ENV') == 'TEST':
    app = create_test_app(db)
else:
    app = create_production_app(db)
