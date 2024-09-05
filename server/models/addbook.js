import mongoose from "mongoose";


const addbookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
   

})
const addModel=mongoose.model("Add",addbookSchema);
export{addModel};

