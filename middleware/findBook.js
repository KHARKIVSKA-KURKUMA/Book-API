const { Book } = require("../models/book");

const findBook = async (req, _, next) => {
  const { bookId } = req.body;
  try {
    const bookInf = await Book.findById(bookId);
    const { author, title, link } = bookInf;
    const book = {
      author,
      title,
      link,
    };
    req.book = book;
    next();
  } catch (error) {
    req.book = {
      author: "Unknown Author",
      title: "Untitled",
      link: "NoImage",
    };
    next();
  }
};

module.exports = findBook;
