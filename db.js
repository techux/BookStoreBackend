const mongoose = require('mongoose');
require("dotenv").config() ;

const mongouri = process.env.MONGO_STRING || "mongodb://localhost:27017/default"

const dbConnect = async function() {
    try {
        await mongoose.connect(mongouri)
        .then(console.log(`[INFO] Conected to MongoDB Successfully => ${mongouri}`));
        
    } catch (error) {
        console.error("[ERROR] Unable to connect to Database : "+ error.message );
    }
}

module.exports = dbConnect ;