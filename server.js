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
const profileControllers = require("./controllers/profileControllers");
app.get("/user/:userId/profile", profileControllers.show);
app.put("/user/:userId/profile", profileControllers.update);

// Item routes
// Create an item
app.post("/user/:userId/item", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
    try {
      const item = await Item.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price : req.body.price,
        seller: req.params.userId
      });
      res.status(200).json({ item: item });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Server Error" });
    }
  }
});

// list of all items
app.get("/user/:userId/item", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
    const items = await Item.find();
    res.status(200).json({ items: items });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Get a specific item
app.get("/user/:userId/item/:itemId", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
    const item = await Item.find({_id: req.params.itemId});
    res.status(200).json({ item: item });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Update an item
app.put("/user/:userId/item/:itemId", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId,{
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price : req.body.price,
    }, { new: true});
    res.status(200).json({ item: item });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Delete an item
app.delete("/user/:userId/item/:itemId", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
    const item = await Item.findByIdAndDelete(req.params.itemId)
    res.status(200).json({ item: item });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// comment routes

// Create a comment
app.post("/user/:userId/item/:itemId/comment", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// list comments
app.get("/user/:userId/item/:itemId/comment", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Get a specific comment
app.get("/user/:userId/item/:itemId/comment/:commentId", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Edit a comment
app.put("/user/:userId/item/:itemId/comment/:commentId", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Delete a comment
app.delete("/user/:userId/item/:itemId/comment/:commentId", async (req, res) => {
  if(String(req.user.id) === req.params.userId){
  try {
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
});

// Startng the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
