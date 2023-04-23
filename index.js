import cors from 'cors'
import path from "path"
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from "multer"
import userRoutes from './Routes/users.js'
import postRoutes from './Routes/posts.js'
import { createPost } from './Controllers/Post.js'
import { fileURLToPath } from "url"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})


app.post("/post/create",upload.single("image"),createPost)
app.use("/user",userRoutes)
app.use('/post',postRoutes)



const PORT = process.env.PORT || 3001
mongoose.set("strictQuery", false);
let connections = mongoose.connect(process.env.MONGO_URL)



app.listen(PORT,()=>{
    try{
        connections
        console.log(`Server Connected With DataBase ${PORT}`)
    }
    catch(err){
    console.log("Somethning Wents Wrong",err)
    }
})