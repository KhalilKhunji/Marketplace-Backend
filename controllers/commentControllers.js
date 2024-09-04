const Item = require("../models/itemModel");

// Create a comment
const create = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
        req.body.poster = req.user.id;
        const item = await Item.findById(req.params.itemId);
        if (!item) return res.status(404).json({error: "Not Found"});
        item.comments.push(req.body);
        await item.save();
        const newComment = item.comments[item.comments.length - 1];
        newComment._doc.poster = req.user;
        res.status(201).json(newComment);
    } catch (error) {
      res.status(422).json({error: "Unprocessable Content"});
    };
  };
};

// list comments
const index = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

// Get a specific comment
const show = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

// Edit a comment
const update = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

// Delete a comment
const remove = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

module.exports = { create, index, show, update, remove };
