const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  followingId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Follower", followerSchema);
