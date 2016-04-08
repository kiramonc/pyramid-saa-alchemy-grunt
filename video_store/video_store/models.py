from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
    DateTime,
    String,
    Boolean,
    ForeignKey,
    Float,
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    relationship,
    )

from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


class Work(Base):
    __tablename__ = 'work'
    id = Column(Integer, primary_key=True)
    theme = Column(String(255))
    description = Column(Text)
    creation_date = Column(DateTime)
    delivery_date = Column(DateTime)
    active_state = Column(Boolean)

    def __init__(self, theme, description, creation_date, delivery_date, active_state):
        self.theme = theme
        self.description = description
        self.creation_date = creation_date
        self.delivery_date = delivery_date
        self.active_state = active_state


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    last_name = Column(String(30))
    username = Column(String(10))
    password = Column(String(255))
    type_user = Column(Boolean)
    active_state = Column(Boolean)
    works = relationship("WorkUser")

    def __init__(self, name, last_name, username, password, type_user, active_state):
        self.name = name
        self.last_name = last_name
        self.username = username
        self.password = password
        self.type_user = type_user
        self.active_state = active_state


class WorkUser(Base):
    __tablename__ = 'work_user'
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    work_id = Column(Integer, ForeignKey('work.id'), primary_key=True)
    delivery_date = Column(DateTime)
    score = Column(Float)
    work = relationship("Work")

    def __init__(self, user_id, work_id, delivery_date, score):
        self.user_id = user_id
        self.work_id = work_id
        self.delivery_date = delivery_date
        self.score = score


# Index('my_index', Work.name, unique=True, mysql_length=255)
