import os
import sys
import transaction

from sqlalchemy import engine_from_config
from datetime import datetime
from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from pyramid.scripts.common import parse_vars

from ..models import (
    DBSession,
    User,
    WorkUser,
    Work,
    Base,
    )


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri> [var=value]\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)
    with transaction.manager:
        model = User(name='Name', last_name='Last Name', username='test', password='test', type_user=True,
                     active_state=True)
        model1 = Work(theme='Test', description='Test of work', creation_date=datetime.now(),
                      delivery_date=datetime.now(), active_state=True)
        model2 = WorkUser(user_id=1, work_id=1, delivery_date=datetime.now(), score=10.0)
        DBSession.add(model)
        DBSession.add(model1)
        DBSession.add(model2)
