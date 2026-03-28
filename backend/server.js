import 'dotenv/config'
import express from 'express' 
import cors from 'cors'
import dns from "node:dns/promises"
import morgan from 'morgan'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import {connectCloudinary} from './config/cloudinary.js'

if(process.env.NODE_ENV === "development"){
  dns.setServers(["8.8.8.8","4.4.8.8"])
}
// App Config 
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary();

// middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-book-store-eta.vercel.app/",
    ],
    credentials: true,
  })
);

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,() => console.log('server started on PORT :' + port))