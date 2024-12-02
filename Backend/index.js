import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://127.0.0.1:5173', // Allow only the specific frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  preflightContinue: false, // Prevent continuing after handling preflight request
  optionsSuccessStatus: 200, // Response status for successful OPTIONS request
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with custom options
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User management routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
