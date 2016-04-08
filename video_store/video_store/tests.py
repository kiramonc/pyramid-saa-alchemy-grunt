import unittest
import transaction

from pyramid import testing
from datetime import datetime

from .models import DBSession


class TestMyViewSuccessCondition(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        from sqlalchemy import create_engine
        engine = create_engine('sqlite://')
        from .models import (
            Base,
            Work,
            WorkUser,
            User,
            )
        DBSession.configure(bind=engine)
        Base.metadata.create_all(engine)
        with transaction.manager:
            model = User(name='Name', last_name='Last Name', username='test', password='test', type_user=True, active_state=True)
            model1 = Work(theme='Test', description='Test of work', creation_date=datetime.now(),
                          delivery_date=datetime.now(), active_state=True)
            model2 = WorkUser(user_id=1, work_id=1, delivery_date=datetime.now(), score=10.0)
            DBSession.add(model)
            DBSession.add(model1)
            DBSession.add(model2)

    def tearDown(self):
        DBSession.remove()
        testing.tearDown()

    def test_passing_view(self):
        from .views import my_view
        request = testing.DummyRequest()
        info = my_view(request)
        self.assertEqual(info['name'].name, 'Name')
        self.assertEqual(info['project'], 'video_store')


class TestMyViewFailureCondition(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        from sqlalchemy import create_engine
        engine = create_engine('sqlite://')
        from .models import (
            Base,
            User,
            Work,
            WorkUser,
            )
        DBSession.configure(bind=engine)

    def tearDown(self):
        DBSession.remove()
        testing.tearDown()

    def test_failing_view(self):
        from .views import my_view
        request = testing.DummyRequest()
        info = my_view(request)
        self.assertEqual(info.status_int, 500)