const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  soldItems: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    default: [],
  },
  boughtItems: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    default: [],
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
