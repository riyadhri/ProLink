const router = require("express").Router();
// api to save post with desc and photo to  mongo db database
const Post = require("../models/post");
const mongoose = require("mongoose");

// validation
//const { postValidation } = require("../validation");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "sender",
          select: "firstname lastname photo",
        },
      })
      .populate({
        path: "owner",
        select: "firstname lastname photo",
      });
    res.send(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// get specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// update post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// create post
router.post("/", async (req, res) => {
  console.log(req.body);
  // create new post
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    // userId: req.body.userId,
    //  date: req.body.date,
    //  likes: req.body.likes,
    //  shares: req.body.shares,
    description: req.body.Desc,
    photos: req.body.Photo,
    //    videos: req.body.videos,
  });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
