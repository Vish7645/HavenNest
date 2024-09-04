const express=require('express')
const userRouter=require('./routes/user.route.js')
const mongoose=require('mongoose')
const dotenv = require("dotenv");

dotenv.config({ path: '../.env' });

const app=express()
const PORT=3000

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Database Connected')
})

.catch((err)=>{
    console.log(err)
})
app.use('/api/user',userRouter)



app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})



