from flask_testing import TestCase
from flask_sqlalchemy import SQLAlchemy
from visitor import Visitor
from app import app as app_template
from api import blueprint
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
                signed_out=True
            )
        ]

    def setUp(self):
        self.app = self.create_app()
        db.session.query(Visitor).delete()
        db.create_all()
        visitors = self.getVisitors()
        for visitor in visitors:
            db.session.add(visitor)
            db.session.commit()
        self.client = self.app.test_client()
        self.visitor_one = {
            'date': visitors[0].date, 
            'firstName': visitors[0].first_name, 
            'id': 1, 
            'isSignedOut': visitors[0].signed_out, 
            'lastName': visitors[0].last_name, 
            'notes': visitors[0].notes
        }

        self.visitor_two = {
            'date': visitors[1].date, 
            'firstName': visitors[1].first_name,
            'id': 1, 
            'isSignedOut': visitors[1].signed_out, 
            'lastName': visitors[1].last_name, 
            'notes': visitors[1].notes
        }


    def tearDown(self):
        db.drop_all()
        db.session.commit()
        db.session.close()

    def test_get_all_visitors(self):
        visitors = db.session.query(Visitor).all()
        assert len(visitors) == 2, 'Visitors are properly created'

    def test_get_all_entries(self):
        resp = self.client.get('/entries')
        json_data = resp.get_json()
        assert json_data['status'] == 'ok'
        assert len(json_data['visitors']) == 2

    def test_get_signed_out(self):
        resp = self.client.get(path='/entries', query_string={'isSignedOut': 'true'})
        json_data = resp.get_json()
        assert json_data['status'] == 'ok'
        assert len(json_data['visitors']) == 1

    def test_update_visitor(self):
        self.visitor_one['isSignedOut'] = True
        resp = self.client.patch('/entries', json={
            'visitor': self.visitor_one
        })
        json_data = resp.get_json()
        assert json_data['status'] == 'ok'
        for visitor in json_data['visitors']:
            if visitor["firstName"] == self.visitor_one["firstName"]:
                assert visitor['isSignedOut'] == True
                return
        assert False

    def test_new_visitor(self):
        visitor_three = {
            'date': None, 
            'firstName': 'new', 
            'isSignedOut': False, 
            'lastName': 'last name', 
            'notes': 'notes'
        }
        resp = self.client.post('/entries', json={
                'visitor': visitor_three
        })
        json_data = resp.get_json()
        assert json_data['status'] == 'ok'
        for visitor in json_data['visitors']:
            if visitor["firstName"] == "new":
                assert True
                return
        assert False
        