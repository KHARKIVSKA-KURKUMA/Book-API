const { Order, schemas } = require(`../../models/order`);
const { errorMessage } = require(`../../helpers`);

const postOrder = async (req, res) => {
  const { error } = schemas.orderAdd.validate(req.body);
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
    const { book, user } = req;
    const { _id: owner } = user;
    const result = await Order.create({ ...req.body, book, owner });
    res.status(201).json(result);
  }
};

module.exports = postOrder;
