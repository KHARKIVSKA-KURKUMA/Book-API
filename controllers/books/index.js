const postBook = require("./postBook");
const getBooks = require("./getBooks");
const putBook = require("./putBook");
const getBookById = require("./getBookById");
const getAuthorPublishedBooks = require("./getAuthorPublishedBooks");
const deleteBook = require("./deleteBook");

module.exports = {
  postBook,
  getBooks,
  putBook,
  getBookById,
  getAuthorPublishedBooks,
  deleteBook,
};
