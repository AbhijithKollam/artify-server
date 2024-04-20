const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    artistName:{
        type:String,
        require:true
    },
    height:{
        type:String,
        require:true
    },
    width:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    artImage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    token:{
        type:String,
        require:true
    }
})

const wishlists = mongoose.model("wishlists",wishlistSchema)

module.exports= wishlists;