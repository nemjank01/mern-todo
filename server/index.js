import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import todoRouter from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;
// routes
app.use("/api/v1/user", authRouter);
app.use("/api/v1/todo", todoRouter);

// global error hendler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}...`));
