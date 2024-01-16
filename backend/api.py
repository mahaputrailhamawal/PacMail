from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv
load_dotenv()

POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
POSTGRES_DB = os.environ.get('POSTGRES_DB')


app = Flask(__name__)
CORS(app) 
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost/{POSTGRES_DB}'
db = SQLAlchemy(app)


class users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=func.now())
    fullName = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    
class Email(db.Model):
    email_id = db.Column(db.Integer, primary_key=True)
    send_at = db.Column(db.DateTime, default=func.now())
    sender_email = db.Column(db.String(255))
    recepient_email = db.Column(db.String(255))
    recepient_email_subject = db.Column(db.String(255))
    recepient_email_body = db.Column(db.String(255))

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        new_user = users(
            fullName=data['fullName'],
            email=data['email'],
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'})
    except Exception as e:
        print('Error processing signup:', str(e))
        return jsonify({'error': 'Error processing signup'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        print('Received login data:', data)

        user = users.query.filter_by(email=data['email']).first()

        if user and bcrypt.check_password_hash(user.password, data['password']):
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    except Exception as e:
        print('Error processing login:', str(e))
        return jsonify({'error': 'Error processing login'}), 500
    
@app.route('/get-emails', methods=['GET'])
def get_emails():
    try:
        current_user_email = request.headers.get('User-Email')  # Gunakan header kustom, contoh: User-Email

        emails = Email.query.filter_by(recepient_email=current_user_email).all()

        email_data = []
        for email in emails:
            email_data.append({
                'timestamp': email.send_at.strftime('%Y-%m-%d %H:%M:%S'),
                'senderEmail': email.sender_email,
                'subject': email.recepient_email_subject,
                'body': email.recepient_email_body
            })

        return jsonify(email_data)
    except Exception as e:
        print('Error getting emails:', str(e))
        return jsonify({'error': 'Error getting emails'}), 500
    
@app.route('/send-email', methods=['POST'])
def post_data():
    try:
        data = request.json
        
        new_email = Email(
                sender_email = data['sender_email'],
                recepient_email = data['recepient_email'],
                recepient_email_subject = data['subject'],
                recepient_email_body = data['body']
            )

        db.session.add(new_email)
        db.session.commit()

        return jsonify({'message': 'Email Sent successfully'})
    except Exception as e:
        print('Error sending email:', str(e))
        return jsonify({'error': 'Error sending email'}), 500
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
