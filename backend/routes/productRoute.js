import express from 'express'
import {addProduct,listProduct,removeProduct, singleProduct} from "../controllers/productController.js"
import upload from '../middleware/multer.js';

const productRouter = express.Router ();

productRouter.post('/add', upload.array('images', 10), addProduct);
productRouter.post('/single',singleProduct);
productRouter.post('/remove',removeProduct);
productRouter.get('/list',listProduct);

export default productRouter