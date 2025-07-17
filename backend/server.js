import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from './src/middleware/rateLimiter.js';
import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from './src/config/db.js';
import path from "path"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5005;
const __dirname = path.resolve()

// 👇 CORS should come first!
if (process.env.NODE_ENV !== "production"){
app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}));
}

app.use(express.json());

// 👇 Rate limiter comes AFTER CORS
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})

}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started", PORT);
  });
});
