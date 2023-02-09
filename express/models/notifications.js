const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sender: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  isRead: { type: Boolean, required: true },
  details: { type: String, required: true },
});

module.exports = mongoose.model("Notification", notificationSchema);
