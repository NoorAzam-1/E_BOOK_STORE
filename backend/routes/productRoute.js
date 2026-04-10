import express from 'express'
import {addProduct,listProduct,removeProduct, singleProduct,updateProduct,addMultipleProducts,getSingleProduct} from "../controllers/productController.js"
import upload from '../middleware/multer.js';

const productRouter = express.Router ();

productRouter.post('/add', upload.array('images', 4), addProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProduct);
productRouter.post("/bulk", addMultipleProducts);
productRouter.post('/remove/:id',removeProduct);
productRouter.put('/update/:id', upload.array('images', 4), updateProduct);
productRouter.get("/:id", getSingleProduct);

export default productRouter