const express = require("express");
const { check, checkPara, validationResult } = require("express-validator");
// const dbConnection = require("../connection/db");
const {
  addComment,
  deleteComment,
  updateComment,
  getComment,
  getAllComments
} = require("../controller/commentsController");

const { getPost } = require("../controller/postsController");
const comments = express.Router();

comments.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).send("INVALID ID");
    }
    let comment = await getComment(id);
    if (comment && comment.length) {
      return res.status(200).send(`${comment[0].content}`);
    }
    return res.status(200).send("NOT FOUND");
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN GETTING COMMENT");
  }
});

comments.post("/", async (req, res) => {
  try {
    const { content, postId } = req.body;
    let { username } = req.user;

    let post = await getPost(postId);
    if (!(post && post.length)) {
      return res.status(400).send(`NO POST EXISTS with Id ${postId}`);
    }
    let { insertId } = await addComment(content, postId, username);
    return res.status(200).send(`POSTED with Id ${insertId} on post ${postId}`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN INSERTING COMMENT");
  }
});

comments.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    let comment = await getComment(id);
    if (!(comment && comment.length)) {
      return res.status(400).send(`NO COMMENT EXISTS with Id ${id}`);
    }
    if(comment[0].username == req.user.username){
        await updateComment(content, id);
        return res.status(200).send(`COMMENT UPDATED with Id ${id}`);
    }
    return res.status(400).send(`NOT THE AUTHOR with Id ${id}`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN UPDATING COMMENT");
  }
});


comments.get("/", async (req, res) => {
    try {
     
      let comments = await getAllComments();
      if (comments && comments.length) {
        return res.status(200).json(comments);
      }
      return res.status(200).send("NOT FOUND");
    } catch (e) {
      console.error(e);
      return res.status(500).send("ERROR IN GETTING POST");
    }
  });

comments.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).send("INVALID ID");
    }
    let comment = await getComment(id);
    if (!(comment && comment.length)) {
      return res.status(400).send(`NO COMMENT EXISTS with Id ${id}`);
    }
    await deleteComment(id);
    return res.status(200).send(`DELETED COMMENT`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN DELETING COMMENT");
  }
});

module.exports = comments;
