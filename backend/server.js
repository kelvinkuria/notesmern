import express from 'express';
import notesRoutes from "./src/routes/notesRoutes.js"
import { connectDB } from './src/config/db.js';
import dotenv from "dotenv";
import rateLimiter from './src/middleware/rateLimiter.js';

dotenv.config()
console.log()

const app = express()
const PORT = process.env.PORT || 5005

//connectDB()

app.use(express.json())

app.use(rateLimiter)

// app.use ((req,res,next)=>{
//     console.log("yeet")
//     next()
// })

app.use("/api/notes",notesRoutes)

connectDB().then(()=>{
app.listen(PORT, ()=>{
    console.log("server started",PORT)
})
})
