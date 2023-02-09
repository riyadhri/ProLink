const mongoose = require("mongoose");

const followersSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  user: { type: String, required: true },
  followers: { type: [String], required: true },
  following: { type: [String], required: true },
});

module.exports = mongoose.model("Followers", followersSchema);
