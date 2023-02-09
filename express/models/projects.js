const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  photo: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);
