const multer = require("multer") ;
var slugify = require('slugify')
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const path = require("path") ;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.ASSETS_FOLDER || "default_uploads") ;
    } ,
    filename: (req, file, cb) => {
        // cb(null, Date.now()*Math.floor(Math.random() * 100)+"-"+file.originalname.replace(/[^a-zA-Z0-9.]/g, "_")) ;
        cb(null, slugify(file.originalname.toLowerCase(),{strict:true}).slice(0,25) +"-"+ customAlphabet(alphabet, 10)()+path.extname(file.originalname)) ;
    }
})


const uploadBook = multer({storage}).fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images', maxCount: 10},
    {name:"book", maxCount:1}
])

module.exports = {
    uploadBook
}
