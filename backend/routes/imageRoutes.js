const express = require("express");
const { upload, uploadImage } = require("../controllers/imageController");

const router = express.Router();

// Image Upload Route
router.post("/upload", upload.array("images", 10), uploadImage);

module.exports = router;
