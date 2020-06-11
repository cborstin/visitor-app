from flask_testing import TestCase
from flask_sqlalchemy import SQLAlchemy
from visitor import Visitor
from app import app as app_template
from api import blueprint
import pdb


db = SQLAlchemy()

class MyTest(TestCase):

    def create_app(self):
        app_template.register_blueprint(blueprint)
        return app_template

    def getVisitors(self):
        return [
            Visitor(
            first_name='joe', 
            last_name='last name',
            notes='notes',
            date=None,
            signed_out=False
            ),
            Visitor(
                first_name='jane', 
                last_name='last name',
                notes='notes',
                date=None,
                signed_out=False
            )
        ]

    def setUp(self):
        self.app = self.create_app()
        ## create visitors:
        db.session.query(Visitor).delete()
        db.create_all()
        visitors = self.getVisitors()
        for visitor in visitors:
            db.session.add(visitor)
            db.session.commit()
        self.client = self.app.test_client()

    def tearDown(self):
        db.drop_all()
        db.session.commit()
        db.session.close()

    def test_get_all_visitors(self):
        visitors = db.session.query(Visitor).all()
        assert len(visitors) == 2, 'Expect all visitors to be returned'

    def test_get_all_entries(self):
        resp = self.client.get('/entries')
        jsonDate = resp.get_json()
        assert resp['status'] == 'ok'
        pdb.set_trace()