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
const Item = require("./models/itemModel")

app.get("/", (req, res) => {
  res.send("Server is connected");
});

// Startng the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
