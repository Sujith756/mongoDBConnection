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