const User = require("../models/userModel");
const Item = require("../models/itemModel");

const create = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const item = await Item.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        seller: req.params.userId,
        image: req.file.location,
      });
      res.status(200).json({ item: item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const index = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const items = await Item.find();
      res.status(200).json({ items: items });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const show = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const item = await Item.find({ _id: req.params.itemId }).populate(
        "comments.poster"
      );
      res.status(200).json({ item: item });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const update = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      if (item.buyer === null) {
        await Item.findByIdAndUpdate(
          req.params.itemId,
          { buyer: req.user.id },
          { new: true },
        );
      }
      if (req.body.name) {
        await Item.findByIdAndUpdate(
          req.params.itemId,
          { name: req.body.name },
          { new: true },
        );
      }
      if (req.body.description) {
        await Item.findByIdAndUpdate(
          req.params.itemId,
          { description: req.body.description },
          { new: true },
        );
      }
      if (req.body.category) {
        await Item.findByIdAndUpdate(
          req.params.itemId,
          { category: req.body.category },
          { new: true },
        );
      }
      if (req.body.price) {
        await Item.findByIdAndUpdate(
          req.params.itemId,
          { price: req.body.price },
          { new: true },
        );
      }
      if (req.file && req.file.location) {
        await Item.findByIdAndUpdate(
          req.params.itemId,
          { image: req.file.location },
          { new: true },
        );
      }
      const updatedItem = await Item.findById(req.params.itemId);
      res.status(200).json({ item: item });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const deleteItem = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const item = await Item.findByIdAndDelete(req.params.itemId);
      res.status(200).json({ item: item });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

module.exports = { create, index, show, update, deleteItem };
