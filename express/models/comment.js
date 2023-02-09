const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  value: { type: String, required: true },
  sender: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  date: { type: Date, required: true },
  read: { type: Boolean, required: true },
  likes: { type: Number, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
