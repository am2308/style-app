import axios from "axios";

// Update this to your backend's URL
const BASE_URL = "http://localhost:5000/api";

export const login = (username, password) => {
  return axios.post(`${BASE_URL}/auth/login`, { username, password });
};

export const uploadImage = (files) => {
    const formData = new FormData();
  
    // Append all selected files to FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
  
    return axios.post(`${BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
};
