// require('dotenv').config({path: "./env"})
import dotenv from "dotenv"
import { connectDB } from "./db/index.js"

dotenv.config("./env");

connectDB();









/*

import express from "express"
const app = express() //now app has superpowers of express.
const port = process.env.PORT




//database is far. so async await.
//may be can't access so wrap in try catch.

;( async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("error", error);
            throw(error);
        })

        app.listen(port, () => {
            console.log(`app is listening on  port ${port}`);
        })
    } catch (error) {
        console.log("error", error)
        throw error
    }

})()//iife

*/