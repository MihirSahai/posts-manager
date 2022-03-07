// CREATE TABLE `comments` (     `id` BIGINT NOT NULL AUTO_INCREMENT KEY,     `content` TEXT NULL DEFAULT NULL ,`postId` BIGINT NOT NULL , `deleted` BOOLEAN);
const dbConnection = require("../connection/db");

const addComment = async (content, postId, username) => {
  //Check content for sql injection etc

  let [addedComment] = await dbConnection.query(
    `INSERT INTO comments (content, postId, username, deleted) values (?, ?, ?, false)`,
    [content, postId, username]
  );
  return addedComment;
};

const deleteComment = async (id) => {
  //Check content for sql injection etc

  let [deletedComment] = await dbConnection.query(
    `UPDATE comments SET deleted = ? WHERE id = ?`,
    [true, id]
  );
  return deletedComment;
};

const updateComment = async (content, id) => {
  //Check content for sql injection etc

  let [updatedComment] = await dbConnection.query(
    `UPDATE comments SET content = ? WHERE id = ?`,
    [content, id]
  );
  return updatedComment;
};

const getComment = async (id) => {
  //Check content for sql injection etc

  let [comment] = await dbConnection.query(
    `SELECT username, content FROM comments WHERE id = ? and deleted = 0`,
    [id]
  );
  return comment;
};

const getAllComments = async () => {
  //Check content for sql injection etc

  let [post] = await dbConnection.query(
    `SELECT content FROM comments WHERE deleted = 0`
  );
  return post;
};

const getAllCommentsForPost = async (postId) => {
  //Check content for sql injection etc

  let [post] = await dbConnection.query(
    `SELECT content FROM comments WHERE deleted = 0 and postId = ?`,
    [postId]
  );
  return post;
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getComment,
  getAllComments,
  getAllCommentsForPost,
};
