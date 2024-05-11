const express = require("express");
const ctrl = require(`../../controllers/orders`);
const { controllersBox } = require(`../../helpers`);
const { IsAuth, findBook } = require(`../../middleware`);

const router = express.Router();

router.post("/", IsAuth, findBook, controllersBox(ctrl.postOrder));
router.get("/", IsAuth, controllersBox(ctrl.getOrder));
router.put("/:orderId", IsAuth, findBook, controllersBox(ctrl.putOrder));
router.delete("/:orderId", IsAuth, controllersBox(ctrl.deleteOrder));

module.exports = router;
