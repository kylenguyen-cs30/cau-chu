import logging
import os
from .models import Pet
from . import db
from werkzeug.utils import secure_filename
from flask import Blueprint, jsonify, request, send_from_directory


main = Blueprint("main", __name__)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {
        "png",
        "jpg",
        "jpeg",
        "gif",
    }


@main.route("/")
def home():
    return jsonify("Welcome to Cau Chu shop Server Side")


# NOTE : adding pet
@main.route("/add_pet", methods=["POST"])
def add_pet():
    try:
        name = request.form.get("name")
        type = request.form.get("type")
        breed = request.form.get("breed")
        price = float(request.form.get("price"))
        age = int(request.form.get("age"))
        description = request.form.get("description")
        image = request.files.get("image")
        gender = request.form.get("gender")

        # NOTE : input checkpoints
        if not all([name, type, breed, age, price, image]):
            return jsonify({"error": "missing required fields"}), 400

        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image.save(os.path.join("uploads", filename))
        else:
            return jsonify({"error": "Invalid image file"}), 400

        # create object Pet
        new_pet = Pet(
            name=name,
            type=type,
            breed=breed,
            age=age,
            price=price,
            description=description,
            imageFilename=filename,
            gender=gender,
        )

        db.session.add(new_pet)
        db.session.commit()

        return jsonify({"message": "Pet is added successfully"})

    except Exception as e:
        print(f"Error adding pet: {e}")
        return jsonify({"error": str(e)}), 500


@main.route("/pets")
def list_pets():
    pets = Pet.query.all()
    pets_list = [
        {
            "name": pet.name,
            "type": pet.type,
            "age": pet.age,
            "gender": pet.gender,
            "price": pet.price,
            "breed": pet.breed,
            "description": pet.description,
            "imageURL": request.host_url + "uploads/" + pet.imageFilename,
        }
        for pet in pets
    ]
    return jsonify(pets_list)


@main.route("/uploads/<filename>")
def get_image(filename):
    try:
        upload_folder = os.path.join(os.getcwd(), "uploads")
        full_path = os.path.join(upload_folder, filename)
        logging.debug(f"Attempting to serve file: {full_path}")
        return send_from_directory(upload_folder, filename)
    except Exception as e:
        logging.error(f"Error serving file {filename} : {e}")
        return jsonify({"error": "File not found"}), 404


@main.route("/populate_pets")
def populate_pets():
    sample_pets = [
        {
            "name": "Buddy",
            "type": "Dog",
            "breed": "Golden Retriever",
            "age": 3,
            "price": 499.99,
            "description": "Friendly and energetic",
            "imageFilename": "buddy.jpg",
            "gender": "Male",
        },
        {
            "name": "Beauty",
            "type": "Cat",
            "breed": "English Tiger",
            "age": 2,
            "price": 499.99,
            "description": "Friendly and lazy",
            "imageFilename": "beauty.jpg",
            "gender": "Female",
        },
        {
            "name": "Moon",
            "type": "Cat",
            "breed": "No Idea",
            "age": 3,
            "price": 399.99,
            "description": "Friendly and lazy",
            "imageFilename": "moon.jpg",
            "gender": "Female",
        },
        {
            "name": "Mochi",
            "type": "Cat",
            "breed": "English Black",
            "age": 3,
            "price": 599.99,
            "description": "Angry but beautiful",
            "imageFilename": "mochi.jpg",
            "gender": "Male",
        },
    ]
    for pet_data in sample_pets:
        new_pet = Pet(
            name=pet_data["name"],
            type=pet_data["type"],
            breed=pet_data["breed"],
            age=pet_data["age"],
            price=pet_data["price"],
            description=pet_data["description"],
            imageFilename=pet_data["imageFilename"],
            gender=pet_data["gender"],
        )
        db.session.add(new_pet)
    db.session.commit()
    return jsonify({"message": "Database populated with sample pets"})


@main.route("/delete_pet/<int:pet_id>", methods=["DELETE"])
def delete_pet(pet_id):
    try:
        pet = Pet.query.filter_by(id).first()
        # that pet exist
        if pet:
            db.session.delete(pet)
            db.session.commit()
            return jsonify({"message": f"Pet with ID {pet_id} deleted successfully"})
        else:
            return jsonify({"error": f"Pet with ID {pet_id} not found"}), 404
    except Exception as e:
        logging.error(f"Error deleting with ID {pet_id} : {e}")
        return jsonify({"error": str(e)}), 500
