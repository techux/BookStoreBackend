const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        default : "Not Provided"
    },
    about : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        default : "Not Provided"
    },
    contact : {
        mobile : {
            type : String,
            default : "Not Provided"
        },
        email : {
            type : String,
            default : "Not Provided"
        },
        other : {
            type: String,
            default : "Not Provided"
        }
    },
    genre : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Genre'
    },
    books : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book"
    }]
}, {timestamps: true}) ;


module.exports = mongoose.model("Author", authorSchema) ;