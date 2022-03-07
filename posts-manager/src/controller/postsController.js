// CREATE TABLE `posts` (     `id` BIGINT NOT NULL AUTO_INCREMENT KEY,     `content` TEXT NULL DEFAULT NULL , `deleted` BOOLEAN, `username` TEXT NOT NULL);
const dbConnection = require("../connection/db");

const addPost = async (content, username) => {
  //Check content for sql injection etc

  let [addedPost] = await dbConnection.query(
    `INSERT INTO posts (content, username, deleted) values (?, ?, false)`,
    [content, username]
  );
  return addedPost;
};

const deletePost = async (id) => {
  //Check content for sql injection etc

  let [deletedPost] = await dbConnection.query(
    `UPDATE posts SET deleted = ? WHERE id = ?`,
    [true, id]
  );
  return deletedPost;
};

const updatePost = async (content, id) => {
  //Check content for sql injection etc

  let [updatedPost] = await dbConnection.query(
    `UPDATE posts SET content = ? WHERE id = ?`,
    [content, id]
  );
  return updatedPost;
};

const getPost = async (id) => {
  //Check content for sql injection etc

  let [post] = await dbConnection.query(
    `SELECT username, content FROM posts WHERE id = ? and deleted = 0`,
    [id]
  );
  return post;
};

const getAllPosts = async () => {
  //Check content for sql injection etc

  let [post] = await dbConnection.query(
    `SELECT id, content FROM posts WHERE deleted = 0`
  );
  return post;
};

module.exports = { addPost, deletePost, updatePost, getPost, getAllPosts };
