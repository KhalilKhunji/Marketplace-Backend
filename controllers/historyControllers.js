const Profile = require("../models/profileModel");
const Item = require("../models/itemModel");

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const userId = profile.owner;

    // Find bought items (where user is the buyer)
    const boughtItems = await Item.find({ buyer: userId }).populate("seller");

    // Find sold items (where user is the seller and buyer is not null)
    const soldItems = await Item.find({
      seller: userId,
      buyer: { $ne: null },
    }).populate("buyer");

    res.status(200).json({
      boughtItems,
      soldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { show };
