const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  date: { type: Date, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
