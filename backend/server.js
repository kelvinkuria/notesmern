import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from './src/middleware/rateLimiter.js';
import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from './src/config/db.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5005;

// 👇 CORS should come first!
app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}));

app.use(express.json());

// 👇 Rate limiter comes AFTER CORS
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started", PORT);
  });
});
