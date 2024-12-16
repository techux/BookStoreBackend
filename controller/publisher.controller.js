const Publisher = require("../models/publisher.model") ;
const mongoose = require('mongoose') ;

const listAllPublisher = async function(req,res) {
    try {
        const result = await Publisher.find({}) ;
        res.status(200).json({status:"ok",result:result});
    } catch (error) {
        console.error("[ERROR] On listing all Publisher "+ error.message);
        res.statsu(500).json({status:"error",message:"Internal Server Error"}) ;
    }
}

const listPublisherById = async function(req,res) {
    try {
        const pubid = req.params.id ;
        if (!mongoose.Types.ObjectId.isValid(pubid)) {
            return res.status(400).json({status:"error",message:"Invalid Publisher ID"}) ;
        }
        const result = await Publisher.findById(pubid).populate('books') ;
        if (!result) {
            return res.status(404).json({status:"error",message:"Publisher not found"}) ;
        }
        res.status(200).json({status:"ok",result:result});
    } catch (error) {
        console.error("[ERROR] listing Publisher by ID"+ error.message);
        res.status(500).json({status:"error",message:"Internal Server Error"}) ;

    }
}


const deletePublisherById = async function(req,res){
    try {
        const pubid = req.params.id ;
        if (!mongoose.Types.ObjectId.isValid(pubid)) {
            return res.status(400).json({status:"error", message:"Internal Server Error"}) ;
        }
        
        await Publisher.findByIdAndDelete(pubid) ;
        res.status(200).json({status:"ok",message:"Publisher deleted successfully"}) ;

    } catch (error) {
        console.error("[ERROR] On Deleting Publisher "+ error.message);
        res.statsu(500).json({status:"error",message:"Internal Server Error"}) ;

    }
}

const addPublisher = async function(req,res){
    try {
        const {name, email, about, books} = req.body ;
        if (!name || !email || !about) {
            return res.status(400).json({status:"error",message:"Name, Email, About are required fields"}) ;
        }
        let query = {} ;
        query = {name, email, about} ;
        if (books) query.books = books ;

        const result = await Publisher.create(query) ;
        res.status(201).json({status:"ok",message:"Publisher added Successfully"});
    } catch (error) {
        console.error("[ERROR] Adding Publisher "+ error.message);
        res.status(500).json({status:"error",message:"Internal Server Error"}) ;
    }
}

module.exports = {
    listAllPublisher,
    listPublisherById,
    deletePublisherById,
    addPublisher
}