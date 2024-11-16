// src/components/CarDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [carData, setCarData] = useState({ title: '', description: '', tags: '' });

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const foundCar = cars.find(car => car.id === parseInt(id));
    setCar(foundCar);
    if (foundCar) {
      setCarData({ title: foundCar.title, description: foundCar.description, tags: foundCar.tags });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const updatedCars = cars.map(car => (car.id === parseInt(id) ? { ...car, ...carData } : car));
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setIsEditing(false);
    setCar(updatedCars.find(car => car.id === parseInt(id)));
  };

  const handleDelete = () => {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const updatedCars = cars.filter(car => car.id !== parseInt(id));
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    navigate('/cars');
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h1>{isEditing ? 'Edit Car' : 'Car Details'}</h1>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input type="text" name="title" value={carData.title} onChange={handleChange} required />
          <textarea name="description" value={carData.description} onChange={handleChange} required />
          <input type="text" name="tags" value={carData.tags} onChange={handleChange} required />
          <button type="submit">Update Car</button>
        </form>
      ) : (
        <div>
          <h2>{car.title}</h2>
          <p>{car.description}</p>
          <p>Tags: {car.tags}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CarDetail;