const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = (req, res, next) => {
    const token = req.header('authorization')?.split("Bearer ")[1] ;
    if (!token) {
        return res.status(403).json({status:"error", message:"Access Denied ! No token Provided"}) ;
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET) ;
        req.user = user ;
        next() ;
    } catch (error) {
        if (error.message == "jwt malformed"){
            return res.status(404).json({status:"error",message:"Access Denied ! Invalid token Provided"})
        }
        if (error.message == "jwt expired"){
            return res.status(404).json({status:"error",message:"Access Denied ! Token Expired"});
        }
        console.error("[ERROR] Auth Middleware : ", error.message);
        console.error(error);
        return res.status(500).json({status:"error",message:"Internal Server Error"})
    }
}


const restrictTo = (roles) => {
    return function(req, res, next) {        
        if (!req.user) return res.status(403).json({status:"error", message:"Access Denied ! Login first"}); 
        if (roles.includes(req.user.role)){
            return next() ;
        }
        return res.status(403).json({status:"error", message:"Access Denied ! Unauthorized"}) ;
    }
}

module.exports = {
    auth,
    restrictTo
}
