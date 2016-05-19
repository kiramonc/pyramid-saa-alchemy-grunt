import xlsxwriter
from pyramid.view import (view_config, forbidden_view_config)
from pyramid.httpexceptions import (HTTPNotFound, HTTPUnauthorized, HTTPOk, HTTPFound)
from pyramid.security import (remember,forget)
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


@view_config(route_name='home', renderer="templates/index.html", permission='all')
def home(request):
    return {'name': 'Name', 'project': 'video_store'}


@forbidden_view_config()
def error(request):
    return HTTPUnauthorized(detail='Bad Login')


@view_config(route_name='users', renderer="json", permission='all')
def users(request):
    return getAll()


@view_config(route_name='user', renderer="json", permission='edit')
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
    elif request.method != 'HEAD':
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


@view_config(route_name='login', renderer='string', permission='all')
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    buscar = DBSession.query(User).filter_by(username=username, active_state=True).count()
    if buscar != 0:
        user = DBSession.query(User).filter_by(username=username, active_state=True).one()
        if user.password == password:
            headers = remember(request, user.id)
            return HTTPOk(content_type="text/html", body="1" if user.type_user else "0", headers=headers)

    return HTTPOk(content_type="text/html", body="invitado")


@view_config(route_name='logout', permission='all')
def logout(request):
    headers = forget(request)
    return HTTPOk(headers=headers)


@view_config(route_name='exportar', renderer="templates/index.html", permission='all')
def exportar(request):
    # Some data we want to write to the worksheet.
    list_users = DBSession.query(User).filter_by(active_state=True).all()
    users = []
    for u in list_users:
        users.append({'id': u.id, 'name': u.name, 'last_name': u.last_name, 'username': u.username,
                      'password': u.password, 'type_user': u.type_user})

    # Create a workbook and add a worksheet.
    workbook = xlsxwriter.Workbook('ListaUsuarios.xlsx')
    worksheet = workbook.add_worksheet('Datos')

    # Start from the first cell. Rows and columns are zero indexed.
    row = 0
    col = 0

    # Iterate over the data and write it out row by row.
    u_c = users[0]
    for item in u_c:
        worksheet.write(row, col, item)
        col += 1
    row += 1
    col = 0
    for row_collection in users:
        for item in row_collection:
            worksheet.write(row, col, row_collection[item])
            col += 1
        col = 0
        row += 1

    # Write a total using a formula.
    # worksheet.write(row, 0, 'Total')
    # worksheet.write(row, 1, '=SUM(B1:B4)')

    workbook.close()
    return HTTPOk(content_type="text/html", body="invitado")

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
