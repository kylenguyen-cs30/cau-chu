import React, { useState } from "react";
import axios from "axios";
import PortalModal from "./portalModal";

const AddPetModal = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageFilename, setImageFileName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // open modal
  const handleOpen = () => {
    setIsOpen(true); // Set open state to true
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new pet object with the submitted data
    const petData = {
      name,
      type,
      breed,
      age,
      price,
      description,
      imageFilename,
    };
    // sned the pet data to backend
    axios
      .post("http://127.0.0.1:5000/add_pet", petData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className="rounded mt-4 w-1/4 bg-blue-500 hover:bg-teal-900 text-white font-bold py-2 px-4 "
      >
        Add your pet
      </button>
      <PortalModal isOpen={isOpen} onClose={handleClose}>
        {/* input field  */}
        <form onSubmit={handleSubmit}>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Type:</label>

          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <label>Price:</label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <label>Breed:</label>

          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <label>Age(months): </label>

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <label>Description: </label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Photo</label>
          {/* Upload or add photolink */}

          <button type="submit">Register</button>
        </form>
      </PortalModal>
    </div>
  );
};

export default AddPetModal;
