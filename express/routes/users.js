const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
require("../models/post");
require("../models/appointment");
require("../models/review");
require("../models/comment");
//router.use(function (req, res, next) {
//res.header("Access-Control-Allow-Origin", "*");
//res.header(
//"Access-Control-Allow-Headers",
//"Origin, X-Requested-With, Content-Type, Accept"
//);
//next();
//});

// api to get all users
router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: {
      wilaya: req.body.wilaya,
      daira: req.body.daira,
      commune: req.body.commune,
    },
    rating: req.body.rating,
    job: req.body.job,
    skills: req.body.skills,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
    photo: req.body.photo,
    gender: req.body.gender,
    birthday: req.body.birthday,
    locationMap: {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully",
        createdUser: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// api to update user by id
router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })

    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/users/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err,
      });
    });
});

// api to delete user by id
router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/users",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// get user using /Myprofile api , populate posts and  populate comments inside posts , and get all appointments of that user ,
router.get("/Myprofile", (req, res) => {
  console.log(req.session.user);
  User.find({ email: req.session.user.email })
    .populate({
      path: "posts",
      populate: {
        path: "comments",
      },
    })
    .populate("appointments")
    .populate("reviews")
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/*
router.get("/Myprofile", (req, res) => {
  console.log(req.session.user);
  User.find({ email: req.session.user.email })
    .populate({
      path: "posts",
      populate: {
        path: "comments",
      },
    })
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
*/

module.exports = router;
