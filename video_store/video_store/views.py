from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError

from .models import (
    DBSession,
    User,
)


def getAll():
    try:
        list_users = DBSession.query(User).filter_by(active_state=True).all()
        users = []
        for u in list_users:
            users.append({'id': u.id, 'name': u.name, 'last_name': u.last_name, 'username': u.username,
                          'password': u.password, 'type_user': u.type_user})
        return {'users': users}
    except DBAPIError:
        return {'mss': 'Error: Get users list'}


@view_config(route_name='home', renderer="templates/index.html")
def home(request):
    return {'name': 'Name', 'project': 'video_store'}


@view_config(route_name='users', renderer="json")
def users(request):
    return getAll()


@view_config(route_name='user', renderer="json")
def user(request):
    if request.method == 'POST':
        name = request.POST['name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        password = request.POST['password']
        type_user = True
        user_post = User(name=name, last_name=last_name, username=username, password=password,
                         type_user=type_user, active_state=True)
        DBSession.add(user_post)
        return {'mss': 'Correct'}
    else:
        uid = request.matchdict['uid']
        u = DBSession.query(User).filter_by(id=uid).one()
        if request.method == 'GET':
            user_get = {'id': u.id, 'name': u.name, 'last_name': u.last_name, 'username': u.username,
                        'password': u.password, 'type_user': u.type_user}
            return {'user': user_get}
        elif request.method == 'PUT':
            u.name = request.POST['name']
            u.last_name = request.POST['last_name']
            u.username = request.POST['username']
            u.password = request.POST['password']
            DBSession.add(u)
            return
        else:
            u.active_state = False
            DBSession.add(u)
            return getAll()

conn_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to run the "initialize_video_store_db" script
    to initialize your database tables.  Check your virtual
    environment's "bin" directory for this script and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""
