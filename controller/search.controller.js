const Book = require("../models/books.model")
const Author = require("../models/author.model")

const SearchBookByTitle = async (req, res) =>{
    const title = req.query.q ;
    if(!title) return res.status(400).json({status:"error", message:"Please provide book title"});
    const book = await Book.findOne({title});
    if(!book) return res.status(404).json({status:"error", message:"Book not found"}) ;
    return res.status(200).json({status:"success", data:book})
}

const SearchByISBN = (req, res) => {
    const isbn = req.query.q;
    if (!isbn) {
        return res.status(400).json({ status: "error", message: "Please provide ISBN Number" });
    }
    Book.findOne({ isbn })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ status: "error", message: "Book not found" });
            }
            return res.status(200).json({ status: "success", data: book });
        })
        .catch((error) => {
            return res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
        });
};


const SearchByAuthor = async (req, res) => {
    const author = req.query.q ;
    if(!author) return res.status(400).json({status:"error", message:"Please provide author name"});
    const book = await Author.findOne({name:author}).select('books').populate('books');
    if(!book) return res.status(404).json({status:"error", message:"Book not found"});
    return res.status(200).json({status:"success", data:book})
}


module.exports = {
    SearchBookByTitle,
    SearchByISBN,
    SearchByAuthor
}