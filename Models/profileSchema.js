const mongoose = require('mongoose')

// create schema
const profileSchema = new mongoose.Schema({
    artistName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    phone:{
        type: String,
        require:true
    },
    address:{
        type: String,
        require:true
    },
    numUpload:{
        type: String,
        require:true
    },
    profileImage:{
        type: String,
        require:true
    },
    userId:{
        type: String,
        require:true
    }
})


const profiles= mongoose.model("profiles",profileSchema)
module.exports= profiles;