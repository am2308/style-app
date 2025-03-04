const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:85", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
    optionsSuccessStatus: 200, // For preflight requests
};
app.use(cors(corsOptions)); // Enable CORS
app.options("*", cors(corsOptions));
// app.use(cors());

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", imageRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the AI Fashion Advisor Backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.use(cors({ origin: "*" })); // Allow requests from any origin
