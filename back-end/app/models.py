from . import db


class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    imageFilename = db.Column(db.Text, nullable=False)

    def __init__(self, name, type, breed, age, price, description, imageFilename):
        self.name = name
        self.type = type
        self.breed = breed
        self.age = age
        self.price = price
        self.description = description
        self.imageFilename = imageFilename

    def __repr__(self) -> str:
        return f"<Pet{self.name}>"
