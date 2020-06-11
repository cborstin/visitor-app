import unittest

from . import create_app, db
from config import basedir
from .visitor import Visitor
import pytest
import pdb
import tempfile


class TestConfig(object):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = 'test'
    TESTING = True

@pytest.yield_fixture
def app():
    def _app(config_class):
        app = create_app(config_class)
        app.test_request_context().push()

        if config_class is TestConfig:
            db.drop_all()
            db.create_all()

        return app

    yield _app
    db.session.remove()
    if str(db.engine.url) == TestConfig.SQLALCHEMY_DATABASE_URI:
        db.drop_all()

def test_testing_config(app):
    app = app(TestingConfig)
    DB_URL = get_env_db_url("testing")
    assert app.config["DEBUG"]
    assert app.config["TESTING"]
    assert not app.config["PRESERVE_CONTEXT_ON_EXCEPTION"]
    assert app.config["SQLALCHEMY_DATABASE_URI"] == DB_URL