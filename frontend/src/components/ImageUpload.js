import React, { useState } from "react";
import { uploadImage } from "../api"; // Updated API function to handle multiple files
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [files, setFiles] = useState([]); // State to hold multiple files
  const [service, setService] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Set multiple selected files
  };

  const handleUpload = async () => {
    if (files.length === 0 || !service) {
      alert("Please select files and a service.");
      return;
    }

    try {
      const response = await uploadImage(files, service); // Send multiple files
      alert("Images uploaded successfully!");
      navigate("/");
      console.log("Response:", response.data);
    } catch (error) {
      alert("Image upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Upload Images</h2>
      {/* Multiple File Selection */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full border px-4 py-2 mt-4"
      />
      {/* Service Selection */}
      <select
        className="block w-full border px-4 py-2 mt-4"
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="" disabled>Select a service</option>
        <option value="makeup">Makeup Recommendations</option>
        <option value="clothing">Clothing Suggestions</option>
      </select>
      {/* Upload Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-4"
        onClick={handleUpload}
      >
        Upload Images
      </button>
    </div>
  );
}

export default ImageUpload;
