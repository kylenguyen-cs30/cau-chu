from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = "uploads"
    app.config["ALLOWED_EXTENSIONS"] = {"png", "jpg", "jpeg", "gif"}

    db.init_app(app)

    with app.app_context():
        db.create_all()

        # Import and register blueprints
        from .routes import main
        from .auth_routes import auth  # Placeholder for future auth routes

        app.register_blueprint(main)
        app.register_blueprint(auth)

    return app
