"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [pets, setPets] = useState([]);
  // fetch pets from back end
  useEffect(() => {
    fetch("http://127.0.0.1:5000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="text-center p-4 text-3xl font-bold text-white bg-gray-80">
        Welcome to Cậu Chủ Shop
      </header>
      <div className="flex flex-grow grid grid-cols-3 gap-4 p-4">
        {pets.map((pet, index) => (
          <div key={index} className="card bg-white shadow-lg rounded p-4">
            <img
              src={`/images/pets/${pet.imageFileName}`}
              alt={pet.name}
              className="h-48 w-full object-cover rounded"
            />
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
      <footer className="text-center p-4 text-white bg-gray-800">
        {" "}
        Copyright © 2024 Cậu Chủ Shop
      </footer>
    </main>
  );
}
