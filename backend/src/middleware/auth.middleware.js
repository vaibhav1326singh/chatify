import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const protectedRoute = async (req,res) =>{
    try {
        const token = req.cookie.jwt
        if(!token){
            return res.status(401).json({message:"invalid user"})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            res.status(401).json({message:"unauthorised user"})
        }

        const user = await User.findById(decode.userId)
        if(!user){
            res.status(404).json({message:"user not found"})
        }
        req.user = user
        next()

    } catch (error) {
        console.log("error in protected route middleware",error)
        return res.status(500).json({message:"server error in middleware"})
    }
}