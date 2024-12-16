const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: String,
    description: String,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})

const reviewModel = mongoose.model('Review', reviewSchema) ;


module.exports = reviewModel