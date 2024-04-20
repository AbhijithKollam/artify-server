const router = require('./Routes/router')    //10
// 1. import dotenv
require("dotenv").config()

//  2. import express
const express = require("express")

// import connection.js
require('./DB/connections')                    //12

// 3.import cors
const cors=require("cors")

// 4. create server
const artServer= express();

//  5. make use of cors by server
artServer.use(cors())

// 6. use a middleware to convert json to javascript object
artServer.use(express.json());
artServer.use(router)                           //11

artServer.use('/uploads',express.static('./uploads'))

// 7. define port
const PORT = 4000;

// 8. run the server
artServer.listen(PORT, ()=>{
    console.log(`Server is running successfully at port : ${PORT}`);
})

artServer.get('/',(req,res)=>{
    res.send("Art Gallery Server is Running Successfully")
})
