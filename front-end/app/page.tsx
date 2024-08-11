"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddPet from "./components/addpet";

interface Pet {
  imageFilename: string;
  imageURL: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  price: number;
}

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  // fetch pets from back end
  useEffect(() => {
    fetch("http://127.0.0.1:5000/pets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not okay");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data", data);
        setPets(data);
      })
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="text-center p-4 pb-60 text-4xl font-bold text-black bg-gray-80">
        Welcome to Cậu Chủ Shop
      </header>
      {/* Add pet button */}
      <div className="  rounded mt-5 py-2 px-4 flex-col flex justify-center w-full">
        <AddPet></AddPet>
      </div>
      <div className="flex flex-grow grid grid-cols-3 gap-4 p-4">
        {pets.length > 0 &&
          pets.map((pet, index) => (
            <div key={index} className="card bg-white  rounded p-4 text-black">
              {/* priorty attribute is not included */}
              {pet.imageURL ? (
                <Image
                  src={pet.imageURL}
                  alt={pet.name}
                  width={300}
                  height={300}
                  className="object-cover  rounded"
                />
              ) : (
                <div>No Image Available</div> // Placeholder in case of no image
              )}
              <p>Name : {pet.name}</p>
              <p>Type: {pet.type}</p>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age} years</p>
              <p className="font-bold">Price: ${pet.price}</p>
              <button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => alert("Added to cart!")}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
      <footer className="text-center p-4 text-black bg-white py-50 w-full">
        {" "}
        Copyright © 2024 Cậu Chủ Shop
      </footer>
    </main>
  );
}
