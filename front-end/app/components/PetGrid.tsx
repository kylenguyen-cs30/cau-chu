import React from "react";
import PetCard from "./PetCard";

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

const PetGrid = ({ pets }: { pets: Pet[] }) => (
  <div className="flex-grow grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {pets.length > 0 &&
      pets.map((pet, index) => <PetCard key={index} pet={pet} />)}
  </div>
);

export default PetGrid;
