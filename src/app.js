import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//When an error is emitted by the app, the error details are logged to the console
//  with console.log("error", error).
app.on("error", (error) => {  
    console.log("error", error);
    throw error;
})

//After logging the error, the code rethrows the error using throw error;.
//  This is often done to make sure the application stops running if a critical 
// issue occurs (instead of silently failing).

const app = express(); // Birth of the ultimate powerful app.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
//That code is like a friendly doorman for your backend. It decides which websites (origins) are allowed to enter and talk to your backend (like your API).

// origin: This is the list of websites the doorman lets in (e.g., your frontend app).
// credentials: true: It also allows these websites to bring cookies or tokens with them, like IDs for who they are.
// So basically, it’s just saying, “Hey backend, let this website in and talk to you safely.”


export {app}  //have to export powerful app to use express in different files.