import express from 'express';
import {addWishlist, getAllWishlist, getSingleWishlist, updateWishlist, deleteWishlist, } from '../controllers/wishlistController.js';
import userAuth from '../middleware/userAuth.js';

const wishlistRouter = express.Router();

wishlistRouter.post("/add",userAuth,addWishlist);
wishlistRouter.get("/all",userAuth,getAllWishlist);
wishlistRouter.get("/:id",userAuth,getAllWishlist);
wishlistRouter.put("/update/:id",userAuth,updateWishlist);
wishlistRouter.delete("/delete/:id",userAuth,deleteWishlist);

export default wishlistRouter;