const { isValidObjectId } = require("mongoose");
const { errorMessage } = require(`../helpers`);

const isValidId = (req, res, next) => {
  const { enrolmentId } = req.params;
  if (!isValidObjectId(enrolmentId)) {
    next(errorMessage({ status: 404, message: "Not found" }));
  }
  next();
};

module.exports = isValidId;
