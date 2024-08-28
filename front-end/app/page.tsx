"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PetGrid from "./components/PetGrid";
import AddPet from "./components/addpet";
import Footer from "./components/Footer";
import Image from "next/image";

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

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);

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
      <Header />
      <Image
        src="/image/pets.jpg"
        alt="Pets"
        priority={true}
        width={1000}
        height={300}
        className="object-cover rounded mt-4 w-full"
      />
      <div className="rounded mt-5 py-2 px-4 flex-col flex justify-center w-full">
        <AddPet />
      </div>
      <PetGrid pets={pets} />
      <Footer />
    </main>
  );
}
