import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home"
import ServiceDropdown from "./components/ServiceDropdown";
import ImageUpload from "./components/ImageUpload";
import Recommendations from "./components/Recommendations";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<ServiceDropdown />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
