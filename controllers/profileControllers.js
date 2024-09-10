const Profile = require("../models/profileModel");
const Item = require("../models/itemModel");

const show = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const profile = await Profile.findOne({ owner: req.params.userId })
        .populate("owner")
        .populate("myItems");

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      // Find items where the user is the seller and the item hasn't been bought yet (buyer is null)
      const mylistItems = await Item.find({
        seller: req.params.userId,
        buyer: null,
      });

      profile.myItems = mylistItems;

      res.status(200).json({ profile: profile });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

const update = async (req, res) => {
  if (String(req.user.id) === req.params.userId) {
    try {
      const profile = await Profile.findOne({ owner: req.params.userId });
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      if (req.body.address === "") {
        return res.status(404).json({ error: "Address field cannot be empty" });
      }
      const updatedProfile = await Profile.findByIdAndUpdate(
        profile._id,
        { address: req.body.address },
        { new: true }
      );
      res.status(200).json({ profile: updatedProfile });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

module.exports = { show, update };
