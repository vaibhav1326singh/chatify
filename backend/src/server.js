import express from "express"
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import { connectdb } from "./lib/db.js"
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)


app.listen(PORT,() => {
    console.log(`server is running at port ${PORT}`)
    connectdb()
})