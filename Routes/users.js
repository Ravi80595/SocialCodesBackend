import express from "express"
import { login,register } from "../Controllers/Auth.js"
import { follow, followApprove, followReject, getUser, getUserRequests, searchUser, updateUser } from "../Controllers/User.js"

const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.get("/:id",getUser)
router.patch("/updateDetail/:id",updateUser)
router.get("/search/:id",searchUser)
router.post('/follow',follow)
router.post("/approve/:id",followApprove)
router.post('/reject/:id',followReject)
router.get('/requests/:id',getUserRequests)

export default router