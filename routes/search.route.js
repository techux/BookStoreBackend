const express = require('express');
const {SearchBookByTitle, SearchByISBN, SearchByAuthor} = require("../controller/search.controller");

const router = express.Router() ;



router.get("/title", SearchBookByTitle) ;
router.get("/isbn", SearchByISBN) ;
router.get("/author", SearchByAuthor) ;


module.exports = router ;
