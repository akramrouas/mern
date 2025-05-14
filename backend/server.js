import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());


app.use(cookieParser())
app.use("/api/users", userRouter);
 
app.get("/", (req, res) => {
  res.send("Server is Ready!");
});
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
