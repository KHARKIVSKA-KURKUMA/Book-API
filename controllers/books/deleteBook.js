const { errorMessage } = require("../../helpers");
const { Book } = require("../../models/book");

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const result = await Book.findByIdAndRemove(bookId);
  if (!result) throw errorMessage({ status: 404 });
  res.json({ message: "Enrolment deleted" });
};

module.exports = deleteBook;
