"""
TODO
- 비밀번호 암호화
- 중복되는 회원가입 방지
- 인코딩 문제 해결
"""

import json
import uuid
import re

from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)

regex_id = re.compile('^[a-z0-9_-]{3,16}$')
regex_email = re.compile('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
regex_password = re.compile('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')

class User(db.Model):
    uid = db.Column(db.Text, primary_key=True)
    id = db.Column(db.Text, unique=True, nullable=False)
    email = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer)

    def __init__(self, uid, id, email, password, count):
        self.uid = uid
        self.id = id
        self.email = email
        self.password = password
        self.count = count

@app.route('/login', methods=['POST'])
def login():
    response = request.json
    id = response['id']
    password = response['password']

    return "!"

@app.route('/logout', methods=['GET'])
def logout():
    return "!"

@app.route('/register', methods=['POST'])
def register():
    response = request.json

    id = response['id']
    email = response['email']
    password = response['password']
    password_check = response['password_check']

    if regex_id.match(id) == None:
        print(regex_id.match(id))
        return "<script>location.href = '/register?err=INVALID_ID';</script>"
    elif regex_email.match(email) == None:
        return "<script>location.href = '/register?err=INVALID_EMAIL';</script>"
    elif password != password_check:
        return "<script>location.href = '/register?err=CHECK_PASSWORD';</script>"
    elif regex_password.match(password) == None:
        return "<script>location.href = '/register?err=INVALID_PASSWORD';</script>"

    db.session.add(User(str(uuid.uuid4()), id, email, password, 0))
    db.session.commit()

    return "<script>location.href = '/';</script>"

@app.route('/get_script', methods=['GET'])
def get_scripts():
    with open('script.json') as file:
        script = json.load(file)
        return script['English'][0]


if __name__ == '__main__':
    db.create_all()
    app.secret_key = 'K3y57R0K3 DYN4M1C2'
    app.run()

