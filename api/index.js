import express from 'express'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
// const authRouter=require('./routes/auth.route.js')
// const mongoose=require('mongoose')
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// const dotenv = require("dotenv");

dotenv.config({ path: '../.env' });
const app=express()
const PORT=3000

app.use(express.json())
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Database Connected')
})

.catch((err)=>{
    console.log(err)
})
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)


app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})



