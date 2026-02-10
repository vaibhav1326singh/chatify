import mongoose from "mongoose"

export const connectdb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose connected",connect.connection.host)
    } catch (error) {
        console.log("mongoose is not connected ",error)
        process.exit(1)
    }
}