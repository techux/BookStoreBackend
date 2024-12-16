const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {isEmail} = require("validator") ;

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique: true,
        validate : {
            validator : isEmail,
            message : "Invalid email format"
        }
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    books : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book'
    }]

})


userSchema.pre('save', async function(next){
    if (this.isNew){
        this.password = await bcrypt.hash(this.password, 10);        
    }
    next() ;
})


module.exports = mongoose.model('user', userSchema) ;