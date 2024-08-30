import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from sqlalchemy import inspect


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # CORS(app, origins=["http://localhost:3000/"])
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = "uploads"
    app.config["ALLOWED_EXTENSIONS"] = {"png", "jpg", "jpeg", "gif"}

    db.init_app(app)

    # NOTE: Secret_Key generating
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "DEFAULT_KEY")

    # NOTE: initialize login manager
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query(int(user_id))

    with app.app_context():
        # Import Models to ensure they are registered
        from .models import Pet, User

        db.create_all()  # This line ensures that all tables are created
        # Import and register blueprints
        from .routes import main
        from .auth_routes import auth  # Placeholder for future auth routes

        app.register_blueprint(main)
        app.register_blueprint(auth)

    return app
