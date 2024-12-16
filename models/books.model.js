const mongoose = require('mongoose');

var slugify = require('slugify')
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    slug : {
        type : String,
        unique : true,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Author'
    },
    description : {
        type : String,
        required : true
    },
    book : {
        type : String,
        required: true
    },
    isbn : {
        type : String,
    },
    publisher : {
        type : mongoose.Schema.Types.ObjectId,
        // required : true,
        ref : 'Publisher',
    },
    publicationDate : {
        type : Date ,
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
    thumbnail : {
        type : String ,
        default : "default_book_image.jpg"
    },
    images : [{
        type : String ,
    }],
    genre : {
        type : mongoose.Schema.Types.ObjectId,
        // required : true,
        ref : 'Genre'
    },
    tags : {
        type : [String] ,
        default : []
    }
}, {timestamps:true}) ;


bookSchema.pre('save', function(next) {
    if (this.isNew) {       
        this.slug = slugify(this.title.toLowerCase(),{strict:true}) +"-"+ customAlphabet(alphabet, 10)();
    }
    next();
})

module.exports = mongoose.model("Book", bookSchema) ;