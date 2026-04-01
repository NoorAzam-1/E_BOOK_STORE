import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  placeOrder,
  getOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", userAuth, placeOrder);
orderRouter.get("/all", userAuth, getOrders);

export default orderRouter;
