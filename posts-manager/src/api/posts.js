const express = require("express");
const { check, checkPara, validationResult } = require("express-validator");
// const dbConnection = require("../connection/db");
const {
  addPost,
  deletePost,
  updatePost,
  getPost,
  getAllPosts,
} = require("../controller/postsController");
// const dbConnection = require("../connection/db");
const { getAllCommentsForPost } = require("../controller/commentsController");
const posts = express.Router();

posts.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).send("INVALID ID");
    }
    let post = await getPost(id);
    if (post && post.length) {
      return res.status(200).send(`${post[0].content}`);
    }
    return res.status(200).send("NOT FOUND");
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN GETTING POST");
  }
});

posts.get("/", async (req, res) => {
  try {
    let posts = await getAllPosts();
    let postData = [];
    if (posts && posts.length) {
      for (var i in posts) {
        let post = posts[i];
        post.comments = await getAllCommentsForPost(post.id);
        postData.push({
          ...post,
        });
      }
      return res.status(200).json(postData);
    }
    return res.status(200).send("NOT FOUND");
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN GETTING POST");
  }
});

posts.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    let { username } = req.user;
    let { insertId } = await addPost(content, username);
    return res.status(200).send(`POSTED with Id ${insertId}`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN INSERTING POST");
  }
});

posts.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    let post = await getPost(id);
    if (!(post && post.length)) {
      return res.status(400).send(`NO POST EXISTS with Id ${id}`);
    }
    if(post[0].username == req.user.username){
        await updatePost(content, id);
        return res.status(200).send(`POST UPDATED with Id ${id}`);
    }
    return res.status(400).send(`NOT THE AUTHOR with Id ${id}`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN UPDATING POST");
  }
});

posts.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).send("INVALID ID");
    }
    let post = await getPost(id);
    if (!(post && post.length)) {
      return res.status(400).send(`NO POST EXISTS with Id ${id}`);
    }
    await deletePost(id);
    return res.status(200).send(`DELETED POST`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("ERROR IN DELETING POST");
  }
});

module.exports = posts;
