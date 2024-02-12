import { error } from 'console';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.routes.js'
  
dotenv.config()
const app = express();



mongoose.connect(process.env.Mongo).then(()=>{
console.log('Connected to The Database')
}).catch(err =>{
    console.log(err)
})
app.use(express.json())
app.listen(3000,()=> {
    console.log("The Server Is Running At Port 3000!!!")
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)


// MIDDLE WARE 
app.use((err, req, res, next) => {
const statusCode = err.statusCode || 500;
const messsage = err.message || "Internal Server Error"
res.status(statusCode).json({
    'success':'false',
    statusCode,
    messsage

})
})