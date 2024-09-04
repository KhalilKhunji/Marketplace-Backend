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
const authenticationControllers = require("./controllers/authenticationControllers");
app.post("/signup", authenticationControllers.signup);
app.post("/signin", authenticationControllers.signin);

// JWT route protection middleware
const authenticateToken = require("./middleware/authenticateToken");
app.use(authenticateToken);

// Profile routes

// Get a specific profile
app.get("/:userId/profile/:profileId", async (req, res) => {
  pass
});

// Update a profile
app.put("/:userId/profile/:profileId", async (req, res) => {
  pass
});

// Delete a profile
app.delete("/:userId/profile/:profileId", async (req, res) => {
  pass
});


// Item routes

// Create an item
app.post("/:userid/item", async (req,res) => {
 pass
});

// list items
app.get("/:userId/item", async (req,res) => {
  pass
 });

// Get a specific item
app.get("/:userId/item/:itemId", async (req,res) => {
  pass
 });

// Update an item
app.put("/:userId/item/:itemId", async (req,res) => {
  pass
 });

// Delete an item
app.delete("/:userId/item/:itemId", async (req,res) => {
  pass
 });

// comment routes

// Create a comment
app.post("/:userId/item/:itemId/comment", async (req,res) => {
  pass
 });
 
 // list comments
 app.get("/:userId/item/:itemId/comment", async (req,res) => {
   pass
  });
 
 // Get a specific comment
 app.get("/:userId/item/:itemId/comment/:commentId", async (req,res) => {
   pass
  });
 
 // Edit a comment
 app.put("/:userId/item/:itemId/comment/:commentId", async (req,res) => {
   pass
  });
 
 // Delete a comment
 app.delete("/:userId/item/:itemId/comment/:commentId", async (req,res) => {
   pass
  });


// Startng the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
