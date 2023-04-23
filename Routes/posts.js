import express from "express"
import {getFeedPosts, getHomeFeed, getLikedUser, getSinglePost, getUserPosts,likePost} from "../Controllers/Post.js"

const router = express.Router()

router.get("/all",getFeedPosts)
router.get("/:userId/posts",getUserPosts)
router.patch("/:id/like",likePost)
router.get("/likes/:id",getLikedUser)
router.get("/singlepost/:id",getSinglePost)
router.get('/homePost',getHomeFeed)


// router.delete("/delete/:id",verifyToken,postDelete)
// router.get("/search/:id",searchPost)
// router.put("/comment",verifyToken,addComment)

export default router;