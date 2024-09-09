const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");

router.post("/:profileId/wishlist", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId).populate(
      "wishlist.item"
    );
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (!req.body.item) {
      return res.status(400).json({ error: "Item is required" });
    }
    if (
      profile.wishlist.find(
        (wishlist) => wishlist.item._id.toString() === req.body.item
      )
    ) {
      return res.status(400).json({ error: "Item already exists in wishlist" });
    }
    const item = req.body.item;
    profile.wishlist.push({ item });
    await profile.save();
    res.status(201).json({ profile });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:profileId/wishlist/:wishlistId", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const wishlist = profile.wishlist.id(req.params.wishlistId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    wishlist.deleteOne();
    await profile.save();
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
