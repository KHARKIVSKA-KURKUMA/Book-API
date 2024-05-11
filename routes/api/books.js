const express = require("express");
const ctrl = require(`../../controllers/books`);
const { controllersBox } = require(`../../helpers`);
const { IsAuth } = require(`../../middleware`);

const router = express.Router();

router.post("/", IsAuth, controllersBox(ctrl.postBook));
router.get("/", controllersBox(ctrl.getBooks));
router.get("/:bookId", IsAuth, controllersBox(ctrl.getBookById));
router.get(
  "/published/:authorId",
  IsAuth,
  controllersBox(ctrl.getAuthorPublishedBooks)
);
router.put("/:bookId", IsAuth, controllersBox(ctrl.putBook));
router.delete("/:bookId", IsAuth, controllersBox(ctrl.deleteBook));

module.exports = router;
