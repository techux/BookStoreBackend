const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
    try {
        const {name,email,username,password} = req.body ;
        if (!name || !email || !username || !password){
            return res.status(400).json({status:"error",message:"All fields are required"}) ;
        }
        const userExist = await User.findOne(
           { $or : [{email},{username}]}
        ) ;
       
        if (userExist) {
            if (userExist.email == email) return res.status(400).json({status:"error",message:"Email already exist"}) ;
            if (userExist.username == username) return res.status(400).json({status:"error",message:"username unavailable"}) ;
        }

        const result = await User.create({name,email,username,password}) ;
        if (result) {
            return res.status(201).json({status:"success",message:"User registered successfully"}) ;
        } else {
            return res.status(400).json({status:"error",message:"Failed to register user"})
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ status: "error", message: error.message });
        }

        console.error("[ERROR] During user registration : ", error.message);
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    }
}

const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) return res.status(400).json({status:"error",message:"All fields are required"});

        const user = await User.findOne({email});
        
        if(!user) return res.status(401).json({status:"error", message: "Invalid username or password"}) ;

        if (await bcrypt.compare(password,user.password)) {
            const token = jwt.sign({id: user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
            return res.status(200).json({token}) ;
        } else {
            return res.status(401).json({status:"error", message: "Invalid username or password"}) ;
        }
    } catch (error) {
        console.error("[ERROR] During user login : ", error.message);
        return res.status(500).json({status:"error", message:"Internal Server error"})
    }
}


const changePassword = async (req,res) => {
    try {
        const {password, newpassword} = req.body ;
        if (!password || !newpassword) {
            return res.status(400).json({status:"error", message:"Old Password and New Password, both are required fields"});
        }

        const result = await User.findById(req.user.id) ;
        if (await bcrypt.compare(password, result.password)) {
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            await User.findOneAndUpdate({_id:req.user.id}, {password:hashedPassword});
            return res.status(200).json({status:"success",message:"Password changed successfully"})
        }

        return res.status(403).json({status:"error", message:"Old Password is Incorrect"}) ;
         
    } catch (error) {
        console.error("[ERROR] Change password : ", error.message);
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    }
}


module.exports = {
    loginController,
    registerController,
    changePassword
}