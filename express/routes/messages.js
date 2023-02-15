const router = require("express").Router();
const Message = require("../models/message");
const mongoose = require("mongoose");

router.post("/getmsg", async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    console.log(messages);

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    console.log("projectedMessages" + projectedMessages);
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
});

router.post("/addmsg", async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    console.log(req.body);
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
