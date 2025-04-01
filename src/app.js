import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js";
const PORT = process.env.PORT || 3000;
// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Task Management API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
