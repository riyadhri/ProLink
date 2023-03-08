const express = require("express");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
require("../models/post");
const Appointment = require("../models/appointment");
const Review = require("../models/review");
require("../models/comment");
const router = require("express").Router();
const Follower = require("../models/follower");

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

  //console.log("user", req.session.user);
  //console.log("isMyprofile", isMyprofile);
  //console.log("profileId", profileId);

  if (isMyprofile == "true") {
    const user = User.find({ email: req.session.user.email })
      .select("_id")
      .exec()
      .then((docs) => {
        // console.log(docs);
        //console.log("user._id", docs[0]._id.toString());
        const userId = docs[0]._id.toString();
        if (userId == profileId) {
          //console.log("user._id == profileId");
          User.find({ _id: userId })
            // lookup for followers_following
            .populate({
              path: "appointments",
              populate: {
                path: "sender receiver",
                select: "firstname lastname photo",
              },
            })
            .populate({
              path: "reviews",
              populate: {
                path: "sender",
                select: "firstname lastname photo",
              },
            })
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

            .exec()
            .then((docs) => {
              // console.log(JSON.stringify(docs));
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
          //console.log("user._id != profileId");
          res.status(500).json({
            error: "user._id != profileId",
          });
        }

        return docs;
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    User.find({ _id: profileId })
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
      .populate({
        path: "reviews",
        populate: {
          path: "sender",
          select: "firstname lastname photo",
        },
      })
      .exec()
      .then((docs) => {
        // console.log(docs);
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

router.get("/:userid", (req, res) => {
  //console.log(" userid " + req.params.userid);
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

// folloW system

// Create a new follower relationship
router.post("/followers", async (req, res) => {
  try {
    const { profileId, sender } = req.body;
    //  console.log("sender", sender);
    // console.log("profileId", profileId);
    // Make sure both sender and profile exist
    const [senderUser, profileUser] = await Promise.all([
      User.findById(sender),
      User.findById(profileId),
    ]);

    if (!senderUser || !profileUser) {
      return res.status(404).send("User not found");
    }

    const follower = new Follower({
      // add _id
      _id: new mongoose.Types.ObjectId(),
      followerId: sender,
      followingId: profileId,
    });

    // console.log("follower", follower);
    await follower.save();
    res.status(201).send(follower);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Unfollow a user
router.delete("/followers/:profileId/:sender", async (req, res) => {
  try {
    const { profileId, sender } = req.params;

    const follower = await Follower.findOne({
      followerId: sender,
      followingId: profileId,
    });

    if (!follower) {
      return res.status(404).send("Follower relationship not found");
    }

    await follower.remove();
    res.send("Unfollowed successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user's followers and following
router.get("/:profileId/followers", async (req, res) => {
  try {
    const { profileId } = req.params;
    // console.log("profileId" + "'" + profileId + "'");
    //const test = await Follower.find({ followingId: profileId });
    //console.log("test", test);

    const [followers, following] = await Promise.all([
      Follower.find({ followingId: profileId }).populate({
        path: "followerId",
        select: "firstname lastname photo",
      }),
      Follower.find({ followerId: profileId }).populate({
        path: "followingId",
        select: "firstname lastname photo",
      }),
    ]);

    //console.log("followers", followers);
    //console.log("following", following);
    const followerProfiles = followers.map((follower) => follower.followerId);
    const followingProfiles = following.map(
      (following) => following.followingId
    );
    //console.log("followerProfiles", followerProfiles);

    res.send({ followers: followerProfiles, following: followingProfiles });
  } catch (error) {
    res.status(500).send(error);
  }
});

// api to recieve appointment  , sender , reciever , date and time , location , and push the id to the user (reciever
router.post("/appointments", async (req, res) => {
  try {
    const { sender, receiver, date, location } = req.body;

    //  console.log("sender", sender);
    // console.log("receiver", receiver);
    // console.log("date", date);
    // console.log("location", location);

    // Make sure both sender and profile exist
    const [senderUser, receiverUser] = await Promise.all([
      User.findById(sender),
      User.findById(receiver),
    ]);

    if (!senderUser || !receiverUser) {
      return res.status(404).send("User not found");
    }

    const appointment = new Appointment({
      // add _id
      _id: new mongoose.Types.ObjectId(),
      sender: sender,
      receiver: receiver,
      date: date,
      location: location,
    });

    // console.log("appointment", appointment);
    await appointment.save();

    // push the _id to the appointment array in user collection ( sender and receiver )

    await User.findByIdAndUpdate(sender, {
      $push: { appointments: appointment._id },
    });
    await User.findByIdAndUpdate(receiver, {
      $push: { appointments: appointment._id },
    });

    res.status(201).send(appointment);
  } catch (error) {
    console.log(error);
  }
});

// api to recieve appointment  , sender , reciever , rating , review , save the current date and time  , and push the id to the user (receiver)
router.post("/reviews", async (req, res) => {
  try {
    const { sender, receiver, rating, review } = req.body;

    // console.log("sender", sender);
    // console.log("reciever", receiver);
    // console.log("rating", rating);
    // console.log("review", review);

    // Make sure both sender and profile exist
    const [senderUser, receiverUser] = await Promise.all([
      User.findById(sender),
      User.findById(receiver),
    ]);

    if (!senderUser || !receiverUser) {
      return res.status(404).send("User not found");
    }

    // check if the sender has already reviewed the receiver
    const check = await Review.findOne({
      sender: sender,
      receiver: receiver,
    });

    if (check) {
      return res.status(404).send("You have already reviewed this user");
    }

    const newreview = new Review({
      // add _id
      _id: new mongoose.Types.ObjectId(),
      sender: sender,
      receiver: receiver,
      rating: rating,
      review: review,
      date: new Date(),
    });

    //  console.log("review", review);
    await newreview.save();

    // push the _id to the reviews array in user collection

    await User.findByIdAndUpdate(receiver, {
      $push: { reviews: newreview._id },
    });
    res.status(201).send(newreview);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
