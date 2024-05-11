const { Order } = require(`../../models/order`);

const getOrder = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Order.find({ owner });
  res.json(result);
};

module.exports = getOrder;
