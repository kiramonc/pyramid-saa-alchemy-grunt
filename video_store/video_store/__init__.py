from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import (
    DBSession,
    Base,
    )


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.add_renderer(name='.html', factory='video_store.renderer.AppDistRendererFactory')
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('start', '/inicio')
    config.add_route('users', '/users-data')
    config.add_route('user', '/users/{uid}')
    config.add_route('works', '/works')
    config.add_route('work', '/works/{uid}')
    config.add_route('delivery_work', '/works/{uid}/folder')
    config.add_route('my_works', '/my_works')
    config.add_route('logout', '/logout')

    config.scan()
    return config.make_wsgi_app()
