const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {timestamps: true})

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Books", "Clothes", "Electronics", "Art", "Miscellaneous"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  comments: [commentSchema]
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
