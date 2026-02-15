import User from "../model/user.model.js"
import Message from "../model/message.model.js"



export const getAllContact = async (req,res) => {
    try {
        const loggedInUser = req.user._id
        const filterUser = User.find({_id:{$ne:loggedInUser}}).select("-password")

        res.status(200).json(filterUser)

    } catch (error) {
        console.log("error in getAllContact",error)
        res.status(500).json({message:"error in server getallcontact"})
    }
}

export const getMessageByUserid = async (req,res) => {
    try {
        const myId = req.user._id
        const {id} = req.param

        const messages = await Message.find({
            $or:[
                {senderId:myId ,receiverId:id},
                {senderId:id ,receiverId:myId}
                
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("error in getting message controller",error)
        res.status(500).json({message:"internal error in messge"})
    }
}

export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body

        if(!text && !image){
            return res.status(401).json({message:"text or image any one of is required"})
        }

        const {id} = req.param
        const senderId = req.user._id

        let imageUrl
        if(image){
            const uploadResponse = await cloudinay.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId,
            recieverId:id,
            text,
            image:imageUrl
        })

        await newMessage.save()

        res.status(200).json(newMessage)
    } catch (error) {
        console.log("error in the send message controller",error)
        return res.status(500).json({message:"invalide server error"})
    }
}

export const getChatPartners = async (req,res) => {
    try {
        const loggedinUser = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId ,receiverId:id},
                {senderId:id ,receiverId:myId}
                
            ]
        })

        const chatPartnerId = [...new Set(messages.map((msg) => msg.senderId.toString() === loggedinUser.toString() ? msg.recieverId.toString : msg.senderId.toString ))]

        const chatPartners = await User.find({_id:{$in:chatPartnerId}}).select("-password")
        res.status(200).json(chatPartners)
    } catch (error) {
        console.log("error in getchatpartners",error)
        res.status(500).json({message:"invalide error in the controller"})
    }
}