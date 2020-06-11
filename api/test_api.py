from flask_testing import TestCase
from .app import db, app
from .visitor import Visitor
import pdb


TEST_SQLALCHEMY_DATABASE_URI = "sqlite:///test.sqlite"
    
class MyTest(TestCase):

    def create_app(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = TEST_SQLALCHEMY_DATABASE_URI
        return app

    def setUp(self):
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
        self.client = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_all_visitors(self):
        visitors = Visitor.query.all()
        assert len(visitors) == 2, 'Expect all visitors to be returned'

    def test_get_all_visitors(self):
        client = app.test_client()
        resp = client.get('/entries')
        pdb.set_trace()