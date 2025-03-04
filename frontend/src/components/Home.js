import React from "react";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to AI Fashion Advisor</h1>
      <p>Discover fashion trends and AI-powered recommendations for clothing and makeup!</p>
      <h2 style={{ marginTop: "30px" }}>Latest Trends</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <img
          src="/assets/fashion-1.jpg"
          alt="Fashion Trend 1"
          style={{ width: "300px", borderRadius: "8px" }}
        />
        <img
          src="/assets/fashion-2.jpg"
          alt="Fashion Trend 2"
          style={{ width: "300px", borderRadius: "8px" }}
        />
        <img
          src="/assets/fashion-3.jpg"
          alt="Fashion Trend 3"
          style={{ width: "300px", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
};

export default Home;
