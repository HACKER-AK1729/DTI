
const mongoose = require("mongoose")
const Schema=mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose")

const userSchema= new Schema(
    {
        
        email:{
            type:String,
            required:true,
            unique:true,
            trim: true,

        },
     
        
    });
    


userSchema.plugin(passportLocalMongoose);
// userSchema.pre("save" , async function(next){
//     if(!this.isModified("password")){
//         return next();
//     }
//     this.password = await bycrpt.hash(this.password, 10);
// });

module.exports=mongoose.model("User",userSchema);
