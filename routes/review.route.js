const express = require('express');
const {addReview, getReview, deleteReview} = require("../controller/review.controller");

const router = express.Router()


router.post("/add", addReview)
router.get("/get/:id", getReview)
router.delete("/delete/:id", deleteReview)



module.exports = router ;