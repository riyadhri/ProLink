const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  date: { type: Date, required: true },
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
