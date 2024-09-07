import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from sqlalchemy import inspect


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True,
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=[
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Credentials",
        ],
    )
    # CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})

    # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = "uploads"
    app.config["ALLOWED_EXTENSIONS"] = {"png", "jpg", "jpeg", "gif"}

    # CORS(app, origins=["http://localhost:3000"])

    # CORS(app)
    db.init_app(app)

    @app.route("/test")
    def test():
        return jsonify({"message": "CORS is working!"})

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

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
