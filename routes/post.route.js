const express= require("express");
const { 
    createPost, 
    getPost,
    updatePost,
    deletePost,
    
} = require("../controllers/post.controller");
const authenticateUser = require("../middleware/authenticate.middleware");

const postRouter=express.Router();

postRouter.post("/create", authenticateUser,createPost)
postRouter.get("/", authenticateUser, getPost)
postRouter.patch("/update/:id",authenticateUser,updatePost)
postRouter.delete("/delete/:id",authenticateUser,deletePost)

module.exports=postRouter;