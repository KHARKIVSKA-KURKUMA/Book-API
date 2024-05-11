const { Book, schemas } = require(`../../models/book`);
const { errorMessage } = require(`../../helpers`);

const postBook = async (req, res) => {
  const { error } = schemas.bookAdd.validate(req.body);
  if (error) {
    const label = error.details[0].context.label;
    if (error.details[0].type === "any.required") {
      throw errorMessage({
        status: 400,
        message: `missing required ${label} field`,
      });
    } else {
      throw errorMessage({
        status: 400,
        message: `${error.details[0].message}`,
      });
    }
  } else {
    const { user } = req;
    const { _id: owner } = user;
    const result = await Book.create({ ...req.body, owner });
    res.status(201).json(result);
  }
};

module.exports = postBook;
