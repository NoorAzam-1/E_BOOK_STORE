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
import cookieParser from "cookie-parser";
import wishlistRouter from "./routes/wishlistRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// ✅ DNS FIX (IMPORTANT FOR EMAIL)
if (process.env.NODE_ENV === "development") {  
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

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
  }),
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/wishlist",wishlistRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("server started on PORT :" + port));
