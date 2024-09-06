const User = require("../models/userModel");
const Item = require("../models/itemModel");

const create = async (req, res) => {
    if(String(req.user.id) === req.params.userId){
      try {
        const item = await Item.create({
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price : req.body.price,
          seller: req.params.userId,
        });
        res.status(200).json({ item: item });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" });
      }
    }
  };

const index = async (req, res) => {
    if(String(req.user.id) === req.params.userId){
    try {
      const items = await Item.find();
      res.status(200).json({ items: items });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
  };

const show =  async (req, res) => {
    if(String(req.user.id) === req.params.userId){
    try {
      const item = await Item.find({_id: req.params.itemId});
      res.status(200).json({ item: item });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
  };

const update = async (req, res) => {
    if(String(req.user.id) === req.params.userId){
    try {
      const item = await Item.findByIdAndUpdate(req.params.itemId,{
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price : req.body.price,
        buyer: req.body.buyer
      }, { new: true});
      res.status(200).json({ item: item });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
  }
const deleteItem = async (req, res) => {
    if(String(req.user.id) === req.params.userId){
    try {
      const item = await Item.findByIdAndDelete(req.params.itemId)
      res.status(200).json({ item: item });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
  };

  module.exports = { create, index, show, update, deleteItem };


