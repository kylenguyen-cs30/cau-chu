import Image from "next/image";
import React from "react";
import Button from "./ui/button/page";

interface Pet {
  imageFilename: string;
  imageURL: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  price: number;
  gender: string;
}

const PetCard = ({ pet }: { pet: Pet }) => (
  <div
    className="card rounded-sm p-4 text-black"
    style={{ backgroundColor: "rgb(245, 237, 237)" }}
  >
    {pet.imageURL ? (
      <Image
        src={pet.imageURL}
        alt={pet.name}
        width={300}
        height={300}
        className="pet-image object-cover  rounded"
      />
    ) : (
      <div>No Image Available</div>
    )}
    <p>Name : {pet.name}</p>
    <p>Type: {pet.type}</p>
    <p>Breed: {pet.breed}</p>
    <p>Age: {pet.age} years</p>
    <p>Gender: {pet.gender}</p>
    <p className="font-bold">Price: ${pet.price}</p>
    <Button onClick={() => alert("Added to cart!")}>Add to Cart</Button>
  </div>
);

export default PetCard;
