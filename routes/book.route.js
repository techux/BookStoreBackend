const express = require('express');
const {addBookController, listAllBooks, listBookbySlug, deleteBookById} = require("../controller/book.controller");
const {auth, restrictTo} = require("../middleware/auth.middleware") ;

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.get("/all", listAllBooks) ;
router.get("/:slug", listBookbySlug) ;
// router.post("/add", auth, restrictTo(['admin']), addBookController) ;
router.post("/add", addBookController) ;
router.delete("/:id", auth, restrictTo(['admin']), deleteBookById) ;

module.exports = router ;