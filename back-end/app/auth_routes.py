import random
import os
import string
import smtplib
from flask import Blueprint, jsonify, request
from .models import User
from . import db
from datetime import datetime, timedelta
from flask_login import login_user, login_required, logout_user

auth = Blueprint("auth", __name__)


# store verification code temporarily
verification_code = {}


def generate_verification_code():
    return "".join(random.choices(string.digits, k=6))


def send_email(to_email, code):
    # extract data from environmental variables
    email_user = os.getenv("EMAIL_USER")
    email_pass = os.getenv("EMAIL_PASS")
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    print(f"Connecting to SMTP the server : {smtp_server}")
    try:
        # Use an email service to email the code
        server = smtplib.SMTP(smtp_server, 587)
        server.starttls()
        server.login(email_user, email_pass)

        # content
        subject = "Cau Chu Verification Code"
        message = f"Subject: {subject} \n\n Your verification code : {code}"
        server.sendmail(email_user, to_email, message)
        server.quit()
    except Exception as e:
        print(f"Failed to send email : {str(e)}")



@auth.route("/register", methods=["POST"])
def register():
    try:
        # Get Email from user 
        email = request.json.get("email")
        username = request.json.get("username")

        # check if the user already existed 
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error" : "User with this email already existed"}), 400

        # create an new user 
        new_user = User(    
            email=email,
            username=username
        )

        # add the user to the database 
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message" : "User Register Successfully "}), 201


    except Exception as e:
        print(f"Error registering user : {e}") 
        return jsonify({"error" : f"Failed to register user : {str(e)}"}),500



@auth.route("/send_verification_code" , methods=["POST"])
def send_verification_code():
    # when user try to login from the page. the application will prompt user to enter the verification code 
    email = request.json.get("email")
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error" : "user not found"}), 404
    code = generate_verification_code()
    print(f"code is {code}")
    expiration_time = datetime.utcnow() + timedelta(minutes=4)
    verification_code[email] = {'code' : code, 'expires' : expiration_time}
    send_email(email, code)
    return jsonify({"message" : "Verification code to the your email"}), 200

@auth.route("/verify_code", methods=["POST"])
def verify_code():
    email = request.json.get("email")
    entered_code = request.json.get("code")

    # no code exist
    if email not in verification_code:
        return jsonify({"error" : "No Verification code for this email " }),404 
    
    store_code_info = verification_code[email]
    # timer expired 
    if datetime.utcnow() > store_code_info['expires']:
        del verification_code[email]
        return jsonify({"error" : "Timer has expired"}), 400

    if entered_code != store_code_info['code'] : 
        return jsonify({"error" : "Invalid code"}), 400

    # Authenticate the user here 

    user = User.query.filter_by(email=email).first()
    if user:
        login_user(user) 
        token = "some_session_token_or_jwt"
        del verification_code[email]
        return jsonify({"message" : "Logged in Successfully" , "token" : token}), 200
    else:
        return jsonify({"error" : "User not found"}),404
    

     


#
# @auth.route("/login", methods=["POST"])
# def login():
#     pass
#
#

@auth.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message" : "User Logged Out Successfully"}),200
    


