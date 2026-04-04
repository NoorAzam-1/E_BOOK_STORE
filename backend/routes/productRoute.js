import express from 'express'
import {addProduct,listProduct,removeProduct, singleProduct,updateProduct,addMultipleProducts} from "../controllers/productController.js"
import upload from '../middleware/multer.js';

const productRouter = express.Router ();

productRouter.post('/add', upload.array('images', 4), addProduct);
productRouter.post('/single',singleProduct);
productRouter.post('/remove',removeProduct);
productRouter.get('/list',listProduct);
productRouter.post("/bulk", addMultipleProducts);

productRouter.put('/update/:id', upload.array('images', 4), updateProduct);

export default productRouter