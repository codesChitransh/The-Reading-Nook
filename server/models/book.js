import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    author:{
            type:String,
            required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    buylink:{
        type:String
    }
})
const bookModel=mongoose.model("books",bookSchema)
export{bookModel}