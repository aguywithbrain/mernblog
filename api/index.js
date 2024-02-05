import { error } from 'console';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/userRoute'
  

dotenv.config()
const app = express();

mongoose.connect(process.env.Mongo).then(()=>{
console.log('Connected to The Database')
}).catch(err =>{
    console.log(err)
})

app.listen(3000,()=> {
    console.log("The Server Is Running At Port 3000!!!")
})

app.get('/test',(req,res)=>{
res.send("Api is Working")
})