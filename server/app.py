#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,make_response, session
from flask_restful import Resource
import os
import logging

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Event, UserEvent, Comment


# Views go here!


#session['user_id'] = None
logging.basicConfig(level=logging.DEBUG)


with app.app_context():
    db.create_all()  # This will create tables if they don’t exist
    print("✅ Database tables created (if not already present)")




if os.getenv("RUN_SEED") == "true":
    from seed import seed_data  # Import seed_data here

    # Ensure it's in the app context
    with app.app_context():
        seed_data()
        print("✅ Seed data inserted successfully.")



@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Events(Resource):
    def get(self):
        events = [{
            'id': event.id,
            'name': event.name,
            'location':event.location
        } for event in Event.query.all()]
        return make_response(events,200)
    def post(self):
        data = request.get_json()
        new_event = Event(
            name = data['name'],
            time = data['time'],
            location = data['location']
        )
        db.session.add(new_event)
        db.session.commit()
        return make_response( new_event.to_dict(), 201)

class EventByID(Resource):
    def get(self,id):
        event = Event.query.get_or_404(id)
        return make_response(event.to_dict(),200)

    def patch(self,id):
        event = Event.query.filter_by(id=id).first()
        content = request.get_json()
        for attr in content:
            setattr(event, attr, content[attr])
        db.session.add(event )
        db.session.commit()
        return make_response(event.to_dict(),201)

    def delete(self,id):
        event = Event.query.filter_by(id=id).first()
        db.session.delete(event)
        db.session.commit()

        response = make_response("",204)
        return response




class Signup(Resource):
    pass
    def post(self):
        data = request.get_json()
        
        
        errors = {}
        
       
        if not data.get('username'):
            errors['username'] = 'Username is required'
        
        
        if not data.get('password'):
            errors['password'] = 'Password is required'
        elif len(data['password']) < 6:
            errors['password'] = 'Password must be at least 6 characters'
        
       
        if errors:
            return {'errors': errors}, 422
        
        try:
            new_user = User(
                username=data['username'],
                
            )
           
            new_user.password_hash = data['password']
            
           
            db.session.add(new_user)
            db.session.commit()
        except ValueError as e:
            
            return {'errors': {'username': str(e)}}, 422
        except Exception as e:
            db.session.rollback()
            return {'errors': {'database': 'Error saving user'}}, 422
        
      
        session['user_id'] = new_user.id
        
       
        return new_user.to_dict(), 201

class CheckSession(Resource):
    pass
    def get(self):
      
        user_id = session.get('user_id')
        logging.debug(f"Session user_id: {user_id}")
        
        if  user_id:
            user = User.query.filter_by(id=user_id).first()              

            serialized_user = user.to_dict()

            
            return serialized_user, 200
            
        
        else:
         return {'error': 'Unauthorized'}, 401
class Login(Resource):
    def post(self):
        data = request.get_json()
        
        
       
        user = User.query.filter_by(username=data.get('username')).first()
        
      
        if user and user.authenticate(data.get('password', '')):
            
            session['user_id'] = user.id
            
           
            return user.to_dict(), 200
        
       
        return {'error': ['Invalid username or password']}, 401

class Logout(Resource):
    pass
    def delete(self):
       
        if not session['user_id'] :
            return {'error': 'Unauthorized'}, 401
        
       
        session["user_id"]= None
        
       
        return '', 204


class Comments(Resource):
    def post(self):
        data = request.get_json()

        new_comment= Comment(
            body = data['body'],
            username = data['username'],
            event_id = data['event_id']
        )
        db.session.add(new_comment)
        db.session.commit()
        return make_response(new_comment.to_dict(),201)
    
class UserEvents(Resource):
    def post(self):
        data = request.get_json()

        new_user_event = UserEvent(user_id = data['user_id'], event_id = data['event_id'], role = data['role'])
        db.session.add(new_user_event)
        db.session.commit()
        return make_response(new_user_event.to_dict(),201)



api.add_resource(Events,'/events')
api.add_resource(EventByID,'/events/<int:id>')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Comments, '/comments')
api.add_resource(UserEvents, '/user_events')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

