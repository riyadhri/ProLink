const express = require("express");
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
const router = require("express").Router();

// get Suggested accounts randomly
router.get("/suggested", async (req, res) => {
  try {
    const users = await User.find().select(" firstname lastname job photo");
    res.send(users);
  } catch (err) {
    res.json({ message: err });
  }
});
// api to update user
router.patch("/:userid", (req, res, next) => {
  const id = req.params.userid;
  const newuser = {
    location: {
      wilaya: req.body.wilaya,
      daira: req.body.daira,
      commune: req.body.commune,
    },
    ...req.body,
  };
  User.updateMany({ _id: id }, { $set: newuser })
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

// add project to user profile
router.patch("/addproject/:userid", (req, res, next) => {
  const id = req.params.userid;
  const newproject = {
    name: req.body.name,
    date: req.body.date,
    link: req.body.link,
    description: req.body.description,
  };
  User.updateMany({ _id: id }, { $push: { projects: newproject } })
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

// register user
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
    socialeMedia: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      gmail: "",
      website: "",
      youtube: "",
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

// get myprofile
router.get("/profile", async (req, res) => {
  const isMyprofile = req.query.isMyprofile;
  const profileId = req.query.profileId;
  console.log("user", req.session);

  console.log("isMyprofile", isMyprofile);
  console.log("profileId", profileId);

  if (isMyprofile == "true") {
    const user = User.find({ email: req.session.user }).select("_id").exec();
    if (req.session.user) console.log("user", req.session.user);
    if (user._id == profileId) {
      User.find({ email: req.session.user.email })
        .populate({
          path: "posts",
          populate: {
            path: "comments",
            populate: {
              path: "sender",
              select: "firstname lastname photo",
            },
          },
          populate: {
            path: "owner",
            select: "firstname lastname photo",
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
    } else {
      // error
    }
  } else {
    User.find({ email: req.session.user })
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          populate: {
            path: "sender",
            select: "firstname lastname photo",
          },
        },
        populate: {
          path: "owner",
          select: "firstname lastname photo",
        },
      })
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
  }
});

//--------------------------------------------------------
/*

router.get("/:userid", (req, res) => {
  console.log(" userid " + req.params.userid);
  User.find({ _id: { $ne: req.params.userid } })
    .select("firstname lastname _id photo")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            firstname: doc.firstname,
            lastname: doc.lastname,
            _id: doc._id,
            photo: doc.photo,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
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
