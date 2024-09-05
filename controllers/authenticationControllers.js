const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign up
const signup = async (req, res) => {
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
  };
  
// sign in
const signin = async (req, res) => {
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
      return res.status(200).json({ message: "Signin successful", token: accessToken, id: user._id });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error"});
    }
  };
  
module.exports = { signin, signup };