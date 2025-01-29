#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import datetime

# Local imports
from models import db, User, Event, UserEvent, Comment  # Only import models here

def seed_data():
    fake = Faker()
    with db.session.begin():
        print("Starting seed...")

        print("Deleting data...")
        User.query.delete()
        Event.query.delete()
        UserEvent.query.delete()
        Comment.query.delete()

        print("Creating users...")
        users = []
        usernames = []

        for i in range(20):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username)
            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)

        print("Creating events ....")
        def random_event_time():
            random_date = fake.date_between(start_date="today", end_date="+60d")
            random_time = fake.time(pattern="%H:%M")
            return datetime.combine(random_date, datetime.strptime(random_time, "%H:%M").time())

        event_names = ['Code & Coffee: Developer Meetup', 'Paint & Sip: Art with a Twist', 'Future Forward: Tech Conference 2025',
                       'Rhythms Under the Stars: Outdoor Concert', 'Eats & Beats: Food Truck Festival', 'Run for Hope: Charity 5K',
                       'Mindful Moments: Yoga in the Park', 'The Great Bake-Off: Amateur Baking Contest', 'Chasing the Stars: Astronomy Night',
                       'Hack the Planet: 24-Hour Hackathon', 'Adventures in Cooking: Italian Cuisine Workshop', 'Laughter Lounge: Open Mic Comedy ',
                       'Books & Brews: Literary Meetup', 'Retro Vibes: 80s Dance Party', 'Craft & Create: DIY Workshop for Beginners',
                       'From Idea to Impact: Business Seminar', 'Paws & Play: Pet Adoption Fair', 'Festival of Flavors: International Food Expo']

        events = []
        for event in event_names:
            new_event = Event(name=event, time=random_event_time(), location=fake.address())
            events.append(new_event)

        db.session.add_all(events)

        print("Creating user events....")
        user_events = []
        roles = ['Attendee', 'Organizer']
        for i in range(30):
            new_user_event = UserEvent(rating=str(randint(1, 5)), role=rc(roles))
            new_user_event.user = rc(users)
            new_user_event.event = rc(events)
            user_events.append(new_user_event)

        db.session.add_all(user_events)

        print('Creating event comments')
        comments = []
        for i in range(50):
            comment = Comment(body=fake.paragraph(), username=rc(usernames))
            comment.event = rc(events)
            comments.append(comment)

        db.session.add_all(comments)

        db.session.commit()
        print("Complete")
