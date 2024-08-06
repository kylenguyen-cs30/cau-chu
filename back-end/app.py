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


# Helper function to check if uploaded files are allowed_file or not
def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]
    )


# @app.before_first_request
@app.before_request
def create_tables():
    db.create_all()


@app.route("/")
def home():
    return jsonify(
        {"message": "Welcome to My Pet Shop!"}
    )  # Improved message consistency


@app.route("/add_pet", methods=["POST"])
def add_pet():
    name = request.form.get("name")
    type = request.form.get("type")
    breed = request.form.get("breed")
    age = int(request.form.get("age"))
    price = float(request.form.get("price"))
    description = request.form.get("description")
    image = request.files.get("image")

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(
            os.path.join(app.config["UPLOAD_FOLDER"], filename)
        )  # image file saving in the backend folder
        image_url = os.path.join(
            app.config["UPLOAD_FOLDER"], filename
        )  # image file in url name
    else:
        return jsonify({"error": "Invalid image file"}), 400

    new_pet = Pet(
        name=name,
        type=type,
        breed=breed,
        age=age,
        price=price,
        description=description,
        imageFilename=image_url,
    )

    db.session.add(new_pet)
    db.session.commit()
    return jsonify({"message": "Pet is added successfully"})


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
    if not os.path.exists(app.config["UPLOAD_FOLDER"]):
        os.makedirs(app.config["UPLOAD_FOLDER"])
    db.create_all()
    app.run(debug=True)
