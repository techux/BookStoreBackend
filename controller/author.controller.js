const mongoose = require('mongoose') ;

const Author = require('../models/author.model') ;


const listAllAuthorController = async (req,res) => {
    try {
        const authors = await Author.find({});
        res.json(authors);
    } catch (error) {
        console.error("[ERROR] Error on listing all authors "+ error.message);
        return res.status(500).json({status:"error", message:"Internal Server Error"})
    }
}

const addAuthor = async (req,res) => {
    try {
        const {name, bio, about, country, contact} = req.body ;

        if (!name || !about ) return res.status(400).json({status:"error", message:"Name and About is mandatory field"}) ;

        const query = {} ;
        query.name = name ;
        query.about = about ;
        if (bio) query.bio = bio ;
        if (country) query.country = country ;
        if (contact) {
            query.contact = {} ;
            if (contact.mobile) query.contact.mobile = contact.mobile ;
            if (contact.email) query.contact.email = contact.email ;
            if (contact.other) query.contact.other = contact.other ;
        }

        try {
            await Author.create(query) ;
            return res.status(201).json({status:"ok",message:"Author added Successfully"}) ;
        } catch (error) {
            console.error("[ERROR] Error on adding author "+ error.message) ;
            return res.status(500).json({status:"error",message:"Some error occured, try again"}) ;
        }

    } catch (error) {
        console.error("[ERROR] Error on adding author "+ error.message); 
        return res.status(500).json({status:"error", message:"Internal Server Error"}) ;
    }
}

const listAuthorByID = async (req,res) => {
    try {
        const authorid = req.params.id ;

        if (!mongoose.Types.ObjectId.isValid(authorid)) {
            return res.status(400).json({status:"error", message:"Invalid Author ID"}) ;
        }

        const result = await Author.findById(authorid) ;
        return res.status(200).json({status:"ok",result})
    } catch (error) {
        console.error("[ERROR] Error Listing author by ID "+ error.message); 
        return res.status(500).json({status:"error", message:"Internal Server Error"}) ;
    }
}

const deleteAuthor = async (req,res) => {
    try {
        const authorid = req.params.id ;
        if (!mongoose.Types.ObjectId.isValid(authorid)) {
            return res.status(400).json({status:"error", message:"Invalid Author ID"}) ;
        }

        await Author.findByIdAndDelete(authorid) ;
        return res.status(200).json({status:"ok",message:"Author deleted Successfully"}) ;

    } catch (error) {
        console.error("[ERROR] Deleting author by ID "+ error.message); 
        return res.status(500).json({status:"error", message:"Internal Server Error"}) ;
    }
}


module.exports = {
    addAuthor,
    listAllAuthorController,
    listAuthorByID,
    deleteAuthor
}