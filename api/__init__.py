from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(config=None):
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    if not config:
        config = 'config.Config'
    app.config.from_object(config)

    db.init_app(app)

    with app.app_context():
        from . import routes  # Import routes
        db.create_all()  # Create database tables for our data models
        db.session.commit()
        return app