const express=require("express");
const {connection}=require("./db");
const { json } = require("express");
const {userRoute}=require("./routers/user.route")
const {NoteRoute}=require("./routers/notes.router")
const {authenction}=require("./middleware/authenication")

const app=express();
require('dotenv').config()
app.use(express.json())
const cors=require("cors");
app.use(userRoute)
app.use(NoteRoute)




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Db is connected");
    } catch (error) {
        console.log(error);
        console.log("Db is not cnnected");
    }
    console.log(`http://localhost:${process.env.port}`);
})