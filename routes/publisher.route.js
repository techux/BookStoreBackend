const express = require('express');
const {listAllPublisher,listPublisherById,deletePublisherById,addPublisher} = require("../controller/publisher.controller");
const {auth, restrictTo} = require("../middleware/auth.middleware") ;

const router = express.Router() ;


router.get("/all",listAllPublisher) ;
router.get("/:id",listPublisherById) ;
router.post("/add", auth, restrictTo(['admin']), addPublisher) ; 
router.delete("/:id", auth, restrictTo(['admin']), deletePublisherById) ;



module.exports = router ;