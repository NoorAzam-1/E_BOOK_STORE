import express from "express";
import userAuth from "../middleware/userAuth.js";
import { addToCart, getCart, updateCart, removeFromCart,} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.get("/", userAuth, getCart);
cartRouter.put("/update", userAuth, updateCart);
cartRouter.delete("/remove/:productId", userAuth, removeFromCart);

export default cartRouter;
