from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)


# Models go here!

class User(db.model,SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String, nullable = True) 

    user_events = db.relationship(
        'UserEvent', back_populates = 'user', cascade = 'all, delete-orphan'
    )

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash cannot be accessed")

    @password_hash.setter
    def password_hash(self, password):
         password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
         self._password_hash = password_hash.decode("utf-8")

    
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))



class Event(db.model,SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    time = db.Column(db.String)
    location = db.column(db.String)
    user_events = db.relationship(
        'UserEvent', back_populates = 'event', cascade = 'all, delete-orphan'
    )

    comments = db.relationship(
        'Comment', back_populates = 'event' , cascade = 'all, delete-orphan'
    )


class UserEvent(db.model,SerializerMixin):
    __tablename__ = 'user_events'

    id = db.Column(db.Integer, primary_key = True)
    rating = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    user = db.relationship(
        'User', back_populates = 'user_events' , cascade = 'all, delete-orphan'
    )
    event = db.relationship(
        'Event', back_populates = 'user_events', cascade = 'all, delete-orphan'
    )


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    username = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    event = db.relationship(
        'Event', back_populates = 'comments', cascade = 'all, delete-orphan'
    )