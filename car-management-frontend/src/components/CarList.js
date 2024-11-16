// src/components/CarList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCars(JSON.parse(localStorage.getItem('cars')) || []);
  }, []);

  const handleDelete = (id) => {
    const updatedCars = cars.filter(car => car.id !== id);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars)); // Update local storage
  };

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Cars</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>
        <Link to="/car-form" style={{ color: 'white', textDecoration: 'none' }}>Add Car</Link>
      </button>
      <ul className="car-list">
        {filteredCars.map(car => (
          <li key={car.id}>
            <Link to={`/car/${car.id}`}>{car.title}</Link>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;