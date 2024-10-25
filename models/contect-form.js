
const mongoose = require("mongoose")
const Schema=mongoose.Schema;


const contectSchema= new Schema(
    {
        
        name:{
            type:String,
            required:true,
            trim: true,

        },
        email:{
            type:String,
            required:true,
            unique:true,

        },
        subject:{
            type:String,
            required:true,

        },
        message:{
            type:String,
            required:true,
        },
     
        
    });
    

module.exports=mongoose.model("Contect",contectSchema);
