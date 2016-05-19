from .models import (
    DBSession,
    User
    )


def groupfinder(userid, request):
    user = DBSession.query(User).filter_by(id=userid).one()
    if user is None:
        grupo = {'invitado': ['invitado']}
        return grupo.get('invitado', [])
    type_user = "admin" if user.type_user else "viewer"
    grupo = {user.id: [type_user]}
    return grupo.get(userid, [])