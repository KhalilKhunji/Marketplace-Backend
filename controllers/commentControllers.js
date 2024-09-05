const Item = require("../models/itemModel");

// Create a comment
const create = async (req, res) => {
  try {
    req.body.poster = req.user.id;
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Not Found" });
    item.comments.push(req.body);
    await item.save();
    const newComment = item.comments[item.comments.length - 1];
    newComment._doc.poster = req.user;
    res.status(201).json(newComment);
  } catch (error) {
    res.status(422).json({ error: "Unprocessable Content" });
  }
};

// Edit a comment
const update = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({error: "Not Found"});
    const comment = item.comments.id(req.params.commentId);
    if (String(comment.poster) === req.user.id) {
      comment.content = req.body.content;
      await item.save();
      res.status(200).json(comment);
    } else {
      res.status(500).json({ error: "Server Error "});
    }
  } catch (error) {
    res.status(422).json({ error: "Unprocessable Content" });
  }
};

// Delete a comment
const remove = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({error: "Not Found"});
    const comment = item.comments.id(req.params.commentId);
    if (String(comment.poster) === req.user.id) {
      item.comments.remove(comment);
      await item.save();
      res.status(200).json(comment);
    } else {
      res.status(500).json({ error: "Server Error "});
    };
  } catch (error) {
    res.status(500).json({ error: "Unprocessable Content" });
  };
};

module.exports = { create, update, remove };
