from flask_testing import TestCase
from flask_sqlalchemy import SQLAlchemy
from app import create_test_app
from visitor import Visitor
from api import blueprint
import pdb


TEST_SQLALCHEMY_DATABASE_URI = "sqlite:///test.sqlite"
db = SQLAlchemy()

class MyTest(TestCase):

    def create_app(self):
        app = create_test_app(db)
        app.register_blueprint(blueprint)
        return app

    def setUp(self):
        app = self.create_app()
        db.create_all()
        ## create visitors:
        visitor = Visitor(
            first_name='joe', 
            last_name='last name',
            notes='notes',
            date=None,
            signed_out=False
        )
        visitor2 = Visitor(
            first_name='jane', 
            last_name='last name',
            notes='notes',
            date=None,
            signed_out=False
        )
        db.session.add(visitor)
        db.session.add(visitor2)
        db.session.commit()
        self.app = app
        self.client = app.test_client()
        self.db = db

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all()

    def test_get_all_visitors(self):
        visitors = Visitor.query.all()
        assert len(visitors) == 2, 'Expect all visitors to be returned'

    def test_get_all_visitors(self):
        resp = self.client.get('/entries')
        pdb.set_trace()