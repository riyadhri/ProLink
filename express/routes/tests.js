const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserSchema = require("../models/user");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

// test api
router.get("/test", (req, res, next) => {
  // console.log(req.session.user);
  res.status(200).json({
    message: "test api",
  });
});
module.exports = router;
