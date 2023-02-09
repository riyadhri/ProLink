const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  sender: { type: String, required: true },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Share", shareSchema);
