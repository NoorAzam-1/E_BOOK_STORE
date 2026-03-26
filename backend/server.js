import express from 'express' 
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import dns from "node:dns/promises"

if(process.env.NODE_ENV === "development"){
  dns.setServers(["8.8.8.8","4.4.8.8"])
}
// App Config 
const app = express()
const port = process.env.PORT || 4000
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,() => console.log('server started on PORT :' + port))