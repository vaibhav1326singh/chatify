import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmail = async (email,name,clientURL)=>{
    const {data,error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"welcome to chatkaro",
        html:createWelcomeEmailTemplate(name,clientURL)
    })

    if(error){
        console.error("error sending welcome email:",error)
        throw new Error("failed to send welcome email")
    }

    console.log("welcome email is send",data)
}