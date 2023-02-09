const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sender: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
