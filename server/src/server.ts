import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { createServer } from "http";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import {socketConfig} from "./config/socket"
import{errorMiddleware} from "./middlewares/error.miidleware"
dotenv.config();

const app = express();
const server = createServer(app);

// Initialize Socket.IO on this server
socketConfig(server)

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/ok", (req, res) => {
  res.send("Welcome to the Task Management API");
});

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server Error:", error);
    process.exit(1);
  }
};
app.use(errorMiddleware)
startServer();
export {socketConfig}