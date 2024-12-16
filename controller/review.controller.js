const Review = require("../models/review.model");

const addReview = async (req, res) => {
    try {
        const {title,description,book} = req.body ;
        const tid = "6748755d6cb3020fb7d361c5" ;
        if(!title || !description || !book){
            return res.status(400).json({status:"error", message:"title. description , book are required fields"})
        }
        const result = await Review.create({title,description,book, user:tid}) ;
        res.status(201).json({status:"ok",result});
    } catch (error) {
        console.error("[ERROR] during adding review : " + error.message);
        res.status(500).json({status:"error", message:"Internal server Error"})
    }
}

const getReview = async (req,res) =>{
    const bookid = req.params.id ;
    if (!bookid) return res.status(400).json({status:"error", message:"Please provide book id"}) ;
    const result = await Review.find({book:bookid}).select('title description') ;
    if (!result) return res.status(200).json({status:"ok", message:"No review found"}) ;
    return res.status(200).json({status:"ok", result})
}

const deleteReview = async (req, res) => {
    const id = req.params.id ;
    if (!id) return res.status(400).json({status:"error", message:"Please provide Review ID to delete"}) ;
    const result = await Review.findOneAndDelete(id);
    console.log(result);
    
    return res.status(200).json({status:"ok", message:"Review Deleted Successfully"});
}

module.exports = {
    addReview,
    getReview,
    deleteReview
}

