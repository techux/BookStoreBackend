const express = require('express');
const cors = require('cors');
require("dotenv").config() ;
const bodyParser = require('body-parser');
const dbConnect = require('./db') ;
const authRoute = require("./routes/auth.route") ;
const bookRoute = require("./routes/book.route") ;
const authorRoute = require("./routes/author.route") ;
const publisherRoute = require("./routes/publisher.route") ;
const accountRoute = require("./routes/account.route") ;
const searchRoute = require("./routes/search.route") ;
const reviewRoute = require("./routes/review.route") ;
const {auth} = require("./middleware/auth.middleware") ;

const PORT = process.env.PORT || 8080 ;
const HOST = process.env.HOSTNAME || "127.0.0.1" ;

const app = express() ;

app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors()) ;


app.get("/",(req,res)=>{
    const start = Date.now() ;
    return res.status(200).json({status:"ok",ping: Date.now()-start+" ms"});
})

app.use("/auth", authRoute) ;
app.use("/book", bookRoute) ;
app.use("/author", authorRoute) ;
app.use("/publisher",publisherRoute) ;
app.use("/account", auth, accountRoute) ;
app.use("/search", searchRoute) ;
app.use("/review", reviewRoute) ;

app.get("/upload", (req,res) => {
    res.sendFile(__dirname+"/uploadfinal.html")
})

app.all("*", (req,res)=>{
    return res.status(404).send("<h1>404 Not Found</h1>")
})

dbConnect() ;
app.listen(PORT,HOST, ()=>{console.log(`[INFO] Server started on port ${PORT} | http://${HOST === '0.0.0.0' ? '127.0.0.1' : HOST}:${PORT}`) ;})