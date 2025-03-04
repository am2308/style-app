const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
// Sign-Up Route
router.post("/signup", signup);

module.exports = router;
