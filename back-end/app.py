from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from typing import Optional


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"  # Corrected config key
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Avoids SQLAlchemy warning
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["ALLOWED_EXTENSIONS"] = {"png", "jpg", "jpeg", "gif"}
db = SQLAlchemy(app)


# Define the model
class Pet(db.Model):  # Corrected class names and `db.Model`
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # either dog or cat
    breed = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    imageFilename = db.Column(db.Text, nullable=False)

    def __init__(
        self,
        name: str,
        type: str,
        breed: str,
        age: int,
        price: float,
        description: Optional[str],
        imageFilename: str,
    ) -> None:
        self.name = name
        self.type = type
        self.breed = breed
        self.age = age
        self.price = price
        self.description = description
        self.imageFilename = imageFilename

    def __repr__(self):
        return f"<Pet {self.name}>"  # Updated to reflect the correct class name


# @app.before_first_request
@app.before_request
def create_tables():
    db.create_all()


@app.route("/")
def home():
    return jsonify(
        {"message": "Welcome to My Pet Shop!"}
    )  # Improved message consistency


# @app.route("/add_pet")
# def add_pet():  # Corrected function name
#     new_pet = Pet(
#         name="Buddy",
#         type="Dog",
#         breed="Golden Retriever",
#         age=3,
#         price=499.99,
#         description="Friendly and energetic",
#         imageFilename="buddy.jpg",
#     )
#     new_pet2 = Pet(
#         name="Beauty",
#         type="Cat",
#         breed="English Tiger",
#         age=2,
#         price=499.99,
#         description="Friendly Lazy",
#         imageFilename="beauty.jpg",
#     )
#     new_pet3 = Pet(
#         name="Moon",
#         type="Cat",
#         breed="No Idea",
#         age=3,
#         price=399.99,
#         description="Friendly and lazy",
#         imageFilename="moon.jpg",
#     )
#     new_pet4 = Pet(
#         name="Mochi",
#         type="Cat",
#         breed="English Black",
#         age=3,
#         price=599.99,
#         description="Angry but Beautiful",
#         imageFilename="mochi.jpg",
#     )
#
#     db.session.add(new_pet)
#     db.session.add(new_pet2)
#     db.session.add(new_pet3)
#     db.session.add(new_pet4)
#
#     db.session.commit()
#     return (
#         f"Added {new_pet}, {new_pet2} , {new_pet3} and {new_pet4}",
#     )  # Updated string formatting
#
@app.route("/add_pet", methods["POST"])
def add_pet():
    name = request.form.get("name")
    type = request.form.get("type")


@app.route("/pets")
def list_pets():
    pets = Pet.query.all()
    pets_list = [
        {
            "name": pet.name,
            "type": pet.type,
            "breed": pet.breed,
            "age": pet.age,
            "price": pet.price,
            "description": pet.description,
            "imageFilename": pet.imageFilename,
        }
        for pet in pets
    ]
    return jsonify(pets_list)


if __name__ == "__main__":
    app.run(debug=True)
