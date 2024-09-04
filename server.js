const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
app.use(morgan("dev"));
const database = require("./config/database");

// Importing user model
const User = require("./models/userModel");

// Importing item model
const Item = require("./models/itemModel");

// Importing profile model
const Profile = require("./models/profileModel");

app.get("/", (req, res) => {
  res.send("Server is connected");
});

// Authentication routes

app.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(process.env.SALT_ROUNDS) || 10,
  );
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });
  await Profile.create({ owner: user._id, address: req.body.address });
  res.status(201).json({ message: "User created" });
});

app.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "User does not exist or invalid credentials" });
    }
    const payload = {
      id: user._id,
      username: user.username,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Signin successful", accessToken: accessToken });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error"});
  }
});

// JWT route protection middleware
const authenticateToken = require("./middleware/authenticateToken");
app.use(authenticateToken);

// Item routes

// Create an item
app.post(":userid/item", async (req,res) => {
 pass
});

// list items
app.get(":userId/item", async (req,res) => {
  pass
 });

// list items
app.get(":userId/item/:itemId", async (req,res) => {
  pass
 });

// Update an item
app.put(":userId/item/:itemId", async (req,res) => {
  pass
 });

// Delete an item
app.delete(":userId/item/:itemId", async (req,res) => {
  pass
 });


// Startng the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
