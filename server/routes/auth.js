const express= require('express')
const mongoose= require('mongoose')
const cors=require('cors')
const Studentmodel1=require('./models/student')
const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://echitranshsrivastava:GrXyVPlq8pdPFEuN@cluster-1.zkjaygh.mongodb.net/bookstore")
app.post("/login",(req,res)=>{
    const{username,password}=req.body;
    Studentmodel1.findOne({username:username})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json({
                    user,
                    success:true
                }) 
            }
            else{
                res.json("Password is incorrect")
            }
        }
        else{
            res.json("No record existed")
        }
    })
})

app.post("/adminlogin",(req,res)=>{
    const{username,password}=req.body;
    Studentmodel1.findOne({username:username})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json({
                    user,
                    success:true
                }) 
            }
            else{
                res.json("Password is incorrect")
            }
        }
        else{
            res.json("No record existed")
        }
    })
})