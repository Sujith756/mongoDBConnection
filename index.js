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
const useSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    productPrice:{
        type:String,
        require:true
    }
})
const User=mongoose.model('User',useSchema)
const Product=mongoose.model('Product',productSchema)
app.post('/signup',async(req,res)=>{
    const user=await User.create(req.body)
    res.send(user)
})
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});
app.post('/product',async(req,res)=>{
    const product=await Product.create(req.body)
    res.send(product)
})
app.get('/users/:username',async(req,res)=>{
    const user=await User.findOne({
        "username":req.params.username
    })
    res.send(user)
})
app.get('/',(req,res)=>{
    res.send('Home route')
})
app.put('/users/:username',async(req,res)=>{
    await User.updateOne({
        "username":req.params.username
    },
    req.body
)
res.send("updated successfullly")
})
app.delete('/users/:username',async(req,res)=>{
    console.log("delete route eachesd")
    await User.deleteOne({
        "username":req.params.username
    })
    res.send('deleted successfully')
})
app.listen(3000,()=>{
    console.log("Server runnning successfuly")
})