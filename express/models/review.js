const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  receiver: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: { type: Date, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
