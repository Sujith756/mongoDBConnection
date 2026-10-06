const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
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
app.post('/signup',async(req,res)=>{
    const hashedPass=await bcrypt.hash(req.body.password,10)

    const user=await User.create({
        "username":req.body.username,
        "password":hashedPass
    })
    res.send(user)
})
app.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=await User.findOne({username})
    if(!user){
        return res.send('userNotFOund')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.send("incorrect password")
    }
    // if(user.password!==password){
    //     return res.send('password incorrect')
    // }
    res.send('login successfull')
})

app.listen(3000,()=>{
    console.log("Server runnning successfuly")
})