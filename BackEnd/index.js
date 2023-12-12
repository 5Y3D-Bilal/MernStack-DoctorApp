//^ ========== ALL IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from './Routes/auth.js'

//^ ===========

//^ Using ENV File
dotenv.config()
//^ =======

const app = express()
const port = process.env.PORT || 3000

const crosOptions = {
    origin: true
}

app.get('/', (req, res) => {
    res.send('API IS WORKING')
})

//^ Connecting With MongoDB 
const DB = process.env.DATABASE
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("MongoDB Connected 🥳");

    }
    catch (err) {
        console.log('Internet issue ')
    }
}
//^ ============================


//^ Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(crosOptions))
app.use('/api/v1/auth' , authRoute)
// ^============================

//^ Listening on [port]
app.listen(port, () => {
    connectDB()
    console.log('Server is running on port 📃', port)
})
//^ =============================