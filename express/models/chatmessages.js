const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  date: { type: Date, required: true },
  message: {
    type: { type: String, required: true },
    content: { type: String, required: true },
  },
  read: { type: Boolean, required: true },
});

module.exports = mongoose.model("Chat", chatSchema);
