const { Book } = require("../../models/book");
const { errorMessage } = require("../../helpers");

const getBooks = async (req, res) => {
  const result = await Book.find({});
  if (!result) {
    throw errorMessage({ status: 404 });
  }
  res.json(result);
};

module.exports = getBooks;
