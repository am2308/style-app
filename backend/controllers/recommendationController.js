exports.getRecommendations = (req, res) => {
    const recommendations = [
      { id: 1, title: "Classic Winter Coats", image: "/uploads/winter-coat.jpg" },
      { id: 2, title: "Vintage Fashion Trends", image: "/uploads/vintage.jpg" },
      { id: 3, title: "Luxury Accessories", image: "/uploads/accessories.jpg" },
    ];
  
    res.json(recommendations);
  };
  