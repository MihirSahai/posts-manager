const express = require("express");

const admin = require("./admin");
const posts = require("./posts");

const comments = require("./comments");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - v1",
  });
});

// router.use('/emojis', emojis);

router.use("/posts", posts);
router.use("/comments", comments);

module.exports = router;
