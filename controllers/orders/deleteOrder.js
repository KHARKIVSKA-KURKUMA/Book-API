const { errorMessage } = require("../../helpers");
const { Order } = require("../../models/order");

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const result = await Order.findByIdAndRemove(orderId);
  if (!result) throw errorMessage({ status: 404 });
  res.json({ message: "Order deleted" });
};

module.exports = deleteOrder;
