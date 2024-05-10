const express = require("express");
const ctrl = require(`../../controllers/auth`);
const { controllersBox } = require(`../../helpers`);
const { IsAuth } = require(`../../middleware`);
const router = express.Router();

router.post("/register", controllersBox(ctrl.register));
router.post("/login", controllersBox(ctrl.login));
router.post("/logout", IsAuth, controllersBox(ctrl.logout));

module.exports = router;
