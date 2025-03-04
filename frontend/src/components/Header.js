import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Link to Home */}
        <Link to="/" className="text-2xl font-extrabold hover:text-gray-300 transition duration-300">
          AI Fashion Advisor
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/login" className="hover:text-gray-300 transition duration-300">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-gray-300 transition duration-300">Signup</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-300 transition duration-300">Services</Link>
            </li>
            <li>
              <Link to="/upload" className="hover:text-gray-300 transition duration-300">Upload</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
