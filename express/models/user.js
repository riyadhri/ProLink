const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  job: { type: String },
  followers: {
    nb: { type: Number, required: true },
    followers: [{ type: String, required: true }],
  },
  following: {
    nb: { type: Number, required: true },
    following: [{ type: String, required: true }],
  },
  location: {
    wilaya: { type: String, required: true },
    daira: { type: String, required: true },
    commune: { type: String, required: true },
  },
  rating: { type: Number, required: true },
  skills: [{ type: String, required: true }],
  email: { type: String, required: true },
  useemail: { type: Boolean, required: true },
  language: { type: String },
  phone: { type: String, required: true },
  website: { type: String },
  photo: { type: String },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  locationMap: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  // socialeMedia contain facebook instagram linkedin twitter gmail website youtube
  // and other social media links
  socialeMedia: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    gmail: { type: String },
    website: { type: String },
    youtube: { type: String },
  },
  // user can have many projects , each project have description , link , date , name
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
  certificates: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
  // add post attribute ref to post
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  // add appointment attribute ref to appointment
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  // add comment attribute ref to reviews
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("User", userSchema);
