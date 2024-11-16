// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CarDetail from './components/CarDetail';
import CarForm from './components/CarForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import CarList from './components/CarList';
import './App.css'; // Import CSS for global styles

function App() {
  const location = useLocation();

  // Determine class name based on route
  const getClassName = () => {
    switch (location.pathname) {
      case '/':
        return 'home';
      case '/about':
        return 'about';
      case '/cars':
        return 'cars';
      case '/car-form':
        return 'car-form';
      case '/login':
        return 'login';
      case '/signup':
        return 'signup';
      default:
        return 'default';
    }
  };

  return (
    <div className={getClassName()} style={{ height: '100vh' }}>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cars">My Cars</Link></li>
          <li><Link to="/car-form">Add Car</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/car-form" element={<CarForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;