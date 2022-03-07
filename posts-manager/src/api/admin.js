const express = require("express");
const admin = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

admin.post("/createNewUser", (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
});

module.exports = admin;