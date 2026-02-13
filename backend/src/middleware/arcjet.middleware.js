import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import "dotenv/config"


export const arcjetProtection = async (req,res,next) =>{
    try {
        const decision =await aj.protect(req)
        if(decision.isDenied){
            if(decision.reason.isRateLimit){
                return res.status(429).json({message:"ratelimiter is exceded please try after sometime"})
            }else if(decision.reason.isBot){
                return res.status(403).json({message:"bot is not allowed"})
            }else {
                return res.status(403).json({message:"denied because of security policy"})
            }
        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"bot is detected",
                message:"malicious activity is detected"
            })
        }
        next()

    } catch (error) {
        console.log("error in the archetproctection",error)
        next()
    }
}