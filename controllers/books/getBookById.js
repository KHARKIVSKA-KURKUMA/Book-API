const { errorMessage } = require("../../helpers");
const { Book } = require("../../models/book");

const getBookById = async (req, res) => {
  const { bookId } = req.params;
  const result = await Book.findById(bookId);
  if (!result) {
    throw errorMessage({ status: 404 });
  }
  res.json(result);
};

module.exports = getBookById;
