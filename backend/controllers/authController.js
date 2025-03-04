const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dynamoDB = require("../config/aws-config");
require("dotenv").config();

const TABLE_NAME = process.env.DYNAMODB_TABLE;

// User Sign-Up
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const params = {
    TableName: TABLE_NAME,
    Key: { username },
  };

  try {
    const { Item } = await dynamoDB.get(params).promise();

    if (Item) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in DynamoDB
    const newUser = {
      username,
      password: hashedPassword,
    };

    const putParams = {
      TableName: TABLE_NAME,
      Item: newUser,
    };

    await dynamoDB.put(putParams).promise();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during sign-up:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const params = {
    TableName: TABLE_NAME,
    Key: { username },
  };

  try {
    const { Item } = await dynamoDB.get(params).promise();

    if (!Item) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, Item.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: Item.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
