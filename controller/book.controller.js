const Book = require("../models/books.model");
const mongoose = require("mongoose");
const {uploadBook} = require("../service/upload.service") ;
const multer = require("multer");
const bodyParser = require('body-parser');

const listAllBooks = async (req,res) => {
    try {
        const result = await Book.find({}).populate("author") ;
        return res.status(200).json({status:"ok", result});
    } catch (error) {
        console.error("[ERROR] Listing all books "+error.message) ;
        return res.status(500).json({status:"error",message:"Internal Server Error"}) ;
    }
}

const listBookbySlug = async (req,res) => {
    try {
        const slug = req.params.slug ;
        const result = await Book.findOne({slug}).populate("author").populate("publisher") ;
        if (!result) {
            return res.status(200).json({status:"ok",message:"Book not found"}) ;
        }
        return res.status(200).json({status:"ok",result}) ;
    } catch (error) {
        console.error(("[ERROR] Listing book by slug "+error.message)) ;
        res.status(500).json({status:"error", message:"Internal Server Error"}) ;
    }
}

const deleteBookById = async (req,res) => {
    try {
        const bookid = req.params.id ;
        if (!mongoose.Types.ObjectId.isValid(bookid)){
            return res.status(400).json({status:"error",message:"Invalid Book ID passed"});
        }
        await Book.findByIdAndDelete(bookid) ;
        res.status(200).json({status:"ok", message:"Book Deleted Successfully"}) ;
    } catch (error) {
        console.error("[ERROR] Deleting Book by ID "+ error.message);
        res.status(500).json({status:"error",message:"Internal Server Error"}) ;
    }
}

const addBookController = (req,res) => {
    bodyParser.urlencoded({extended: true})(req, res, (err) => {
        if (err) {
            return res.status(400).json({status:"error", message:"Error on submitting data, please recheck"}) ;
        }
        console.log(req.body);
        
        const { title, author, description, price, isbn, publisher, publicationDate, genre, tags } = req.body;
            
        if (!title || !author || !description || !publicationDate || !price) {
            return res.status(400).json({status:"error", message:"Title, Author, Description, Price, Publication Date are required fields"}) ;
        }
        
        uploadBook(req, res, async function(error){
            if (error && error instanceof multer.MulterError){
                if (error.code == "LIMIT_UNEXPECTED_FILE"){
                    return res.status(400).json({status:"error", message:"Max file count allowed is 5 for images"}) ;
                } else {
                    return res.status(400).json({status:"error", message:error.message}) ;
                }
            }
            try {
                if (!req.files.thumbnail || !req.files.images || !req.files.book) {
                    return res.status(400).json({status:"error", message:"Missing Thumbnail or Images or Book"}) ;
                }
                
                const query = {title, author, description, publicationDate, price, thumbnail:req.files.thumbnail[0].path, images:req.files.images.map((file) => file.path), book:req.files.book[0].path} ;
    
                if (isbn) query.isbn = isbn ;
                if (publisher) query.publisher = publisher ;
                if (genre) query.genre = genre ;
                if (tags) query.tags = tags ;
    
                console.log(query);
                const result = await Book.create(query) ;
                res.status(201).json({status:"ok",slug:result.slug})
                
            } catch (error) {
                if (error.name == "ValidationError"){
                    const message = Object.values(error.errors).map(err => {
                        return `${err.path} must be a ${err.kind} type`;
                    });
                    return res.status(400).json({status:"error",message});
                }
                console.error("[ERROR] During adding book "+ error.message) ;
                return res.status(500).json({status:"error", message:"Internal server error"}) ;
            }
        })
    })
}


module.exports = {
    addBookController,
    listAllBooks,
    listBookbySlug,
    deleteBookById
}