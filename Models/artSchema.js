const mongoose = require('mongoose')

const artSchema = new mongoose.Schema({
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
    }
})

const arts = mongoose.model("arts",artSchema)

module.exports= arts;