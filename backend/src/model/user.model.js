import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
        minlegth:6
    },
    profilePicture:{
        type:String,
        default:""
    }
},{timestamps:true})


const User = mongoose.model("User",userSchema)

export default User