import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter
import HomePage from "./components/HomePage";
import './App.css'

const App = () => {
  return (
      <Routes>
          <Route path="/test_repo" element={<HomePage />} />
          {/* <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}

      </Routes>
  );
};

export default App;
