const express = require('express');
const {profileController, myBookController} = require("../controller/account.controller");

const {auth} = require("../middleware/auth.middleware");

const router = express.Router() ;

router.get("/profile", profileController);
router.get("/mybook", myBookController);

module.exports = router ;