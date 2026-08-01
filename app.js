const express=require('express')
const mongoose=require('mongoose')
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
    const{username,password}=req.body
    const user=await User.findOne({username})
    if(!user){
        return res.send("Invalid user")
    }
    if(user.password!==password){
        return res.send("Password incorrect")
    }
    res.send("Login Successfull")
})
app.get('/users',async(req,res)=>{
 const users=await User.find()
 res.send(users)
})
app.listen(3000,()=>{
    console.log("server running successfully")
})