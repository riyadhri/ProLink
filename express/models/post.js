const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  date: {
    type: Date,
    // , required: true
  },
  likes: {
    type: Number,
    // , required: true
  },
  shares: {
    type: Number,
    // , required: true
  },
  description: {
    type: String,
    //, required: true
  },
  photos: [{ type: String }],
  videos: [{ type: String }],
  // add comments ref
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", postSchema);
