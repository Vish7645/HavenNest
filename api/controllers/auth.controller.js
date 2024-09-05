import User from './../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'


dotenv.config({path:'./../../.env'})
export const signup= async (req,res,next)=>{
    const {username,email,password}=req.body
    const hashedPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save()
        res.status(201).json({massage:"User is successfully saved"})
    } catch (error) {
        // res.status(500).json(error.massage)
        next(error)
    }
}

export const signin=async (req,res,next)=>{
    const {email,password} =req.body
    try {
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'))
        const validPassword=bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials'))
        
        // We need JWT_SECRET as a secret agent to assign a stamp
        const token=jwt.sign({_id: validUser._id}, process.env.JWT_SECRET)
        
        // To remove password showing at response
        const { password: pass, ...rest } = validUser._doc; 
        res
            .cookie('access_token',token,{httpOnly : true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

// module.exports=signup
// export default signup