import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js"
import { errorHandler } from '../utils/error.js'

export const signup = async(req,res,next)=>{
   const {username, email, password} = req.body

   if (!username || !password || !email || username ==='' || password === '' || email === ''){
    return next(errorHandler(400, 'All feilds are Required Please Fill Them '))
   }

   const hashedpassword = bcryptjs.hashSync(password, 10)

   const newUser = new User({
    username,
    password: hashedpassword,
    email
   })

    try {
        await newUser.save();
        console.log(newUser);
        res.json({
         "message": "New User Is Created",
         "success": "true"
        });
    } catch (error) {
        next(error)
    }
}
