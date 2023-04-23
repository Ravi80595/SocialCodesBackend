import mongoose from "mongoose";
import { GetCurrentDate,GetCurrentTime } from "../Utils/DateTime.js";

const currentDate=GetCurrentDate()
const currentTime=GetCurrentTime()

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true,require:true},
    firstName:{type:String,require:true,min:2,max:40},
    lastName :{type:String,require:true,min:2,max:40},
    email :{type:String,require:true,unique:true,max:40},
    password :{type:String,require:true,min:5},
    friends:{type:Array,default:[]},
    location:String,
    bio:{type:String,default:"Enter Bio"},
    date:{type:String,default:currentDate},
    time:{type:String,default:currentTime},
    following:{type:Array,default:[]},
    followers:{type:Array,default:[]},
    pendingFollowRequests:{type:Array,default:[]}
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

export default User 