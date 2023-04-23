import mongoose from "mongoose";
import { GetCurrentDate,GetCurrentTime } from "../Utils/DateTime.js";
const {ObjectId}=mongoose.Schema.Types

const currentDate=GetCurrentDate()
const currentTime=GetCurrentTime()

const postSchema = mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true
        },
        username:String,
        description:String,
        picturePath:String,
        likes:{type:Array,default:[]},
        date:{type:String,default:currentDate},
        time:{type:String,default:currentTime},
        createdAt: Date,
    }
)

const Post = mongoose.model("Post",postSchema)

export default Post;