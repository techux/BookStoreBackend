const express = require('express');
const {loginController, registerController, changePassword} = require('../controller/auth.controller') ;
const {auth} = require("../middleware/auth.middleware") ;

const router = express.Router() ;
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post("/login", loginController) ;
router.post("/register", registerController) ;
router.post("/changepassword", auth, changePassword) ;


module.exports = router ;