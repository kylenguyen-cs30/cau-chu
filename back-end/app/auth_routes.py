from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, login_required
from .models import User

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    pass


@auth.route("/login", methods=["POST"])
def login():
    pass


@auth.route("/logout", methods=["POST"])
@login_required
def logout():
    pass
