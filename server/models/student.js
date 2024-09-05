import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    }
})
const studentModel= mongoose.model('Student',studentSchema)
export{studentModel}