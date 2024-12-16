const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        default: "Not Provided"
    },
    about : {
        type : String ,
        required : true
    },
    books : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book'
    }]
},{timestamps: true})

module.exports = mongoose.model("Publisher", publisherSchema)