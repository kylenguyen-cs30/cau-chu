import React, { useState } from "react";
import Modal from "react-modal";

const AddPetModal = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new pet object with the submitted data
    const petData = {
      name,
      type,
      breed,
      age,
      price,
    };
  };
};
