// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import { useState, useEffect } from 'react';

// Import your components
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Features from "./components/FeaturesPage";
import UploadPage from "./components/UploadPage";

// Mock authentication function
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return true; // or false based on authentication status
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route path="/features" element={<Features />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;