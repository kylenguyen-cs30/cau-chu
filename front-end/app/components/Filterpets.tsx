import React, { useState } from "react";

interface FilterProps {
  onFilter: (filter: any) => void;
}

const FilterPets: React.FC<FilterProps> = ({ onFilter }) => {
  const [age, setAge] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [gender, setGender] = useState<string>("");
  const [breed, setBreed] = useState<string>("");

  const handleFilter = () => {
    onFilter({
      age,
      maxPrice,
      gender,
      breed,
    });
  };

  return (
    <div className="filter-container p-4 rounded bg-white">
      {/* Age Filter  */}
      <div className="filter-group">
        <label>Age:</label>
        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">All</option>
          <option value="newborn">New Born</option>
          <option value="">1-3 years</option>
          <option value="">All</option>
        </select>
      </div>

      {/* Max Price Filter  */}
      <div className="filter-group">
        <label>Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="enter price"
        />
      </div>

      {/* Breed */}
      <div>
        <label>Breed:</label>
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="enter breed"
        />
      </div>
    </div>
  );
};

export default FilterPets;
