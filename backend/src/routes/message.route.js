import express, { Router } from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js"
import {getAllContact,getChatPartners,getMessageByUserid,sendMessage} from "../controller/message.controller.js"

const router = express.Router()

router.use(arcjetProtection,protectedRoute)

router.get('/contact',getAllContact)
router.get('/chats',getChatPartners)
router.get('/:id',getMessageByUserid)
router.post('/send/:id',sendMessage)

export default Router