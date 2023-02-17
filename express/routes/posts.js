const router = require("express").Router();
// api to save post with desc and photo to  mongo db database
const Post = require("../models/post");
const mongoose = require("mongoose");
const Comment = require("../models/comment");
const Like = require("../models/like");
// validation
//const { postValidation } = require("../validation");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes.likeinfo")
      .populate({
        path: "likes.likeinfo",
        select: "sender",
      })
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
    console.log(posts);
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
    // add current date and time new date
    date: new Date(),
    likes: { number: 0, likeinfo: [] },
    shares: 0,
    description: req.body.Desc,
    photos: req.body.Photo,
    //    videos: req.body.videos,
    owner: req.body.owner,
  });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
// create new comment using value , sender from req , then push new comment id to posts
// comments array
router.post("/addcomment", async (req, res) => {
  // create new comment
  const newComment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    value: req.body.value,
    sender: req.body.sender,
    date: new Date(),
    read: false,
    likes: 0,
  });
  try {
    const savedComment = await newComment.save();
    // push comment id to post comments
    const post = await Post.findById(req.body.postId);
    post.comments.push(savedComment._id);
    await post.save();
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// add new like , and push it to array of likes
router.post("/addlike", async (req, res) => {
  // create new like
  const newLike = new Like({
    _id: new mongoose.Types.ObjectId(),
    sender: req.body.sender,
    postId: req.body.postId,
    date: new Date(),
  });
  try {
    const savedLike = await newLike.save();
    // push like id to post likes
    const post = await Post.findById(req.body.postId);
    post.likes.likeinfo.push(savedLike._id);
    post.likes.number = post.likes.number + 1;
    await post.save();
    res.json(savedLike);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete like using likeID , and delete from array in post
router.post("/dislike", async (req, res) => {
  console.log("Received a DELETE request");
  try {
    // delete like where sender == req.body.sender
    // and postId == req.body.postId
    const removedLike = await Like.deleteOne({
      sender: req.body.sender,
      postId: req.body.postId,
    });

    // const removedLike = await Like.remove({ _id: req.body.likeId });
    // delete like id from post likes
    const post = await Post.findById(req.body.postId);
    post.likes.likeinfo.pull(req.body.likeId);
    post.likes.number = post.likes.number - 1;
    await post.save();
    res.json(removedLike);
  } catch (err) {
    console.log("Received a DELETE request  error");

    res.json({ message: err });
  }
});

module.exports = router;
