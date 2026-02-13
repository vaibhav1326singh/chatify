import express from "express"
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'
import cookieParser from "cookie-parser"
import { connectdb } from "./lib/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute)


app.listen(PORT,() => {
    console.log(`server is running at port ${PORT}`)
    connectdb()
})