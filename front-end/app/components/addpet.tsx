import React, { useState } from "react";
import axios from "axios";
import PortalModal from "./portalModal";
import Button from "./ui/button/page";

const AddPetModal = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [gender, setGender] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // open modal
  const handleOpen = () => {
    setIsOpen(true); // Set open state to true
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // NOTE: handle submission event
  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new pet object with the submitted data

    // add information into formdata
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("breed", breed);
    formData.append("price", price.toString());
    formData.append("age", age.toString());
    formData.append("description", description);
    formData.append("gender", gender);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // send pet data to backend
    axios
      .post("http://127.0.0.1:5000/add_pet", formData)
      .then((response) => {
        console.log(response.data);
        window.location.reload(); // reload the window at location
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Button onClick={handleOpen}>Add your pet</Button>
      <PortalModal isOpen={isOpen} onClose={handleClose}>
        {/* input field  */}
        <div title="Register New Pet">
          <div onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-black-100"
              />
            </div>

            <div>
              <label>Type:</label>

              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border-2 border-black-100"
              />
            </div>
            <div>
              <label>Price:</label>

              <input
                type="number"
                value={price}
                onChange={(e) => {
                  const value = e.target.value;
                  setPrice(value === "" ? 0 : parseFloat(value));
                }}
                className="border-2 border-black-100"
              />
            </div>
            <div>
              <label>Breed:</label>

              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="border-2 border-black-100"
              />
            </div>

            <div>
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border-2 border-black-100"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Age(months): </label>

              <input
                type="number"
                value={age}
                onChange={(e) => {
                  const value = e.target.value;
                  setAge(value === "" ? 0 : parseInt(value));
                }}
                className="border-2 border-black-100"
              />
            </div>

            <div>
              <label>Description: </label>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-black-100"
              />
            </div>

            <div>
              <label>Photo</label>
              {/* Upload or add photolink */}
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button type="submit">Register</Button>
          </div>
        </div>
      </PortalModal>
    </div>
  );
};

export default AddPetModal;
