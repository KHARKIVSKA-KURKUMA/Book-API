const { Order, schemas } = require("../../models/order");
const { errorMessage } = require("../../helpers");

const putOrder = async (req, res) => {
  const { error } = schemas.orderAdd.validate(req.body);
  if (error) {
    const length = Object.keys(error._original).length;
    const label = error.details[0].context.label;
    if (length === 0) {
      throw errorMessage({ status: 400, message: "missing fields" });
    }
    if (error.details[0].type === "any.required") {
      throw errorMessage({
        status: 400,
        message: `missing required ${label} field`,
      });
    } else if (error.details[0].type === "string.pattern.base") {
      throw errorMessage({
        status: 400,
        message: `The name must be at least 3 letters long `,
      });
    } else {
      throw errorMessage({
        status: 400,
        message: `${error.details[0].message}`,
      });
    }
  }
  const { orderId } = req.params;
  const { book } = req;
  const result = await Order.findByIdAndUpdate(
    orderId,
    { ...req.body, book },
    {
      new: true,
    }
  );
  if (!result) throw errorMessage({ status: 404 });
  res.json(result);
};

module.exports = putOrder;
