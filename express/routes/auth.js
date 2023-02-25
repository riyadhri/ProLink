const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserSchema = require("../models/user");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
//signup
router.post("/signup", async (req, res) => {
  const { useemail, email, password, firstname, lastname } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Password and email are required" });
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should be at least 8 characters long" });
  }

  const user = await UserSchema.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  const newUser = new UserSchema({
    _id: new mongoose.Types.ObjectId(),
    firstname: firstname,
    lastname: lastname,
    password: "0",
    followers: 0,
    following: 0,
    location: {
      wilaya: "none",
      daira: "none",
      commune: "none",
    },
    rating: 0,
    skills: "none",
    email: email,
    useemail: useemail,
    phone: "none",
    website: "none",
    photo: "none",
    gender: "none",
    birthday: new Date(),
    locationMap: {
      longitude: 0,
      latitude: 0,
    },
  });

  bcrypt.hash(password, 7, async (err, hash) => {
    if (err)
      return res.status(400).json({ msg: "error while saving the password" });

    newUser.password = hash;
    const savedUserRes = await newUser.save();

    if (savedUserRes) {
      const userSession = { email: savedUserRes.email }; // creating user session to keep user loggedin also on refresh
      req.session.user = userSession;
      // return  (_id , firstname , lastname )  in the res
      return res.status(200).send({
        _id: savedUserRes._id,
        firstname: savedUserRes.firstname,
        lastname: savedUserRes.lastname,
        photo: savedUserRes.photo,
      });
    }
  });
});
// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Something missing" });
  }

  const user = await UserSchema.findOne({ email: email }); // finding user in db
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    const userSession = { email: user.email };
    req.session.user = userSession;
    console.log(req.session.user);
    // return  (_id , firstname , lastname )  in the res
    return res.status(200).send({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      photo: user.photo,
    });
  } else {
    return res.status(400).json({ msg: "Invalid credential" });
  }
});

// api to logout
router.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    return res.status(200).send({ msg: "You have logged out successfully" });
  }
});

// api to check if user is logged in
router.get("/isAuth", async (req, res) => {
  if (req.session.user) {
    console.log(req.session);
    return res.json(req.session.user);
  } else {
    return res.status(401).json("unauthorize");
  }
});

module.exports = router;
