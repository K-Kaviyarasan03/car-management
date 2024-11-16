// src/components/CarForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarForm = () => {
  const [carData, setCarData] = useState({ title: '', description: '', tags: '', images: [] });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCarData({ ...carData, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const newCar = { ...carData, id: cars.length + 1 }; // Assign an ID
    localStorage.setItem('cars', JSON.stringify([...cars, newCar]));
    navigate('/cars'); // Navigate to the cars list after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a New Car</h1>
      <label>Car Title:</label>
      <input type="text" name="title" onChange={handleChange} required />
      <label>Description:</label>
      <textarea name="description" onChange={handleChange} required />
      <label>Tags (comma-separated):</label>
      <input type="text" name="tags" onChange={handleChange} required />
      <label>Images (up to 10):</label>
      <input type="file" multiple onChange={handleImageChange} accept="image/*" />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;