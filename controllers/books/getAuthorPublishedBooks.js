const { Book } = require("../../models/book");
const { errorMessage } = require("../../helpers");

const getAuthorPublishedBooks = async (req, res) => {
  const { authorId: owner } = req.params;
  const result = await Book.find({ owner });
  if (!result) {
    throw errorMessage({ status: 404 });
  }
  res.json(result);
};

module.exports = getAuthorPublishedBooks;
