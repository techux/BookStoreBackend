const express = require('express');
const {listAllAuthorController, addAuthor, listAuthorByID, deleteAuthor} = require("../controller/author.controller") ;
const {auth, restrictTo} = require("../middleware/auth.middleware") ;

const router = express.Router() ;

router.get("/all",listAllAuthorController) ;
router.get("/:id", listAuthorByID) ;
router.post("/add", auth, restrictTo(['admin']), addAuthor) ;
router.delete("/:id", auth, restrictTo(['admin']), deleteAuthor) ;

module.exports = router ;