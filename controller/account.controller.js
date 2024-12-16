const User = require("../models/user.model") ;
const Book = require("../models/books.model") ;

const profileController = async (req, res) =>{
    try {
        const result = await User.findById(req.user.id, {password:0, books:0, __v:0}) ;
        return res.status(200).json({status:"ok", data:result}) ;
    } catch (error) {
        console.error("[ERROR] during profile viewing");
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}

const myBookController = async (req, res) => {
    try {
        // const result = await User.findById(req.user.id).select('books').populate("books").populate("author") ;
        const result = await User.findById(req.user.id).select('books').populate({
            path: 'books',
            populate: {        
                path: 'author',   
                select: 'name',
            },
        })
        .exec();
        
        res.status(200).json({status:"ok", data:result}) ;
    } catch (error) {
        console.error("[ERROR] During listing My Books");
        console.error(error);
        
        return res.status(500).json({status:"error", message:"Internal server error"})
    }
}

module.exports = {
    profileController,
    myBookController
}