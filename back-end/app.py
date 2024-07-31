from flask import Flask, jsonify  # Corrected 'Flask' capitalization
from flask_sqlalchemy import SQLAlchemy  # Corrected 'SQLAlchemy' capitalization

# from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"  # Corrected config key
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Avoids SQLAlchemy warning
db = SQLAlchemy(app)
# migrate = Migrate(app, db)


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


@app.route("/add_pet", methods=["GET", "POST"])
def add_pet():  # Corrected function name
    new_pet = Pet(
        name="Buddy",
        type="Dog",
        breed="Golden Retriever",
        age=3,
        price=499.99,
        description="Friendly and energetic",
        imageFilename="buddy.jpg",
    )
    new_pet2 = Pet(
        name="Beauty",
        type="Cat",
        breed="English Tiger",
        age=2,
        price=499.99,
        description="Friendly Lazy",
        imageFilename="beauty.jpg",
    )

    db.session.add(new_pet)
    db.session.add(new_pet2)

    db.session.commit()
    return f"Added {new_pet} and {new_pet2} ", 200  # Updated string formatting


@app.route("/pets")
def list_pets():
    pets = Pet.query.all()
    return "\n".join([str(pet) for pet in pets])


if __name__ == "__main__":
    app.run(debug=True)
