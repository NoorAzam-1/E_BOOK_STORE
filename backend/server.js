import "dotenv/config";
import express from "express";
import cors from "cors";
import dns from "node:dns/promises";
import morgan from "morgan";
import feedbackRouter from "./routes/feedbackRoutes.js";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import { connectCloudinary } from "./config/cloudinary.js";

// ✅ DNS FIX (IMPORTANT FOR EMAIL)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = process.env.PORT || 4000;

// DB + Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// ✅ FINAL CORS FIX (WORKS FOR LOCAL + LIVE)
const allowedOrigins = [
  "http://localhost:3000",
  "https://e-book-store-eta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/feedback",feedbackRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("server started on PORT :" + port));