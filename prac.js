const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app=express()
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/admin')
.then(()=>{
    console.log('mongoDB Connected')
})
.catch((err)=>{
    console.log('mongoDB not connected')
})
const signupSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const User=mongoose.model('User',signupSchema)

app.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=await User.findOne({username})
    if(!user){
        return res.send('userNotFOund')
    }
   
    // if(user.password!==password){
    //     return res.send('password incorrect')
    // }
    const token=jwt.sign({
        username:user.username
    },collegecoders)
    res.send(token)
})

app.listen(3000,()=>{
    console.log("Server runnning successfuly")
})