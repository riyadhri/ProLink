const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  reporter: { type: String, required: true },
  reportedUserId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  reason: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Report", reportSchema);
