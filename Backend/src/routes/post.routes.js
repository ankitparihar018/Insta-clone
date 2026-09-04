const express = require ("express");
const postRouter = express.Router();
const createPost =require ("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});
const {identifyUser} = require("../middlewares/auth.middleware.js");

postRouter.post("/", identifyUser, upload.single("image"), createPost.createPostController);
postRouter.get("/", identifyUser,createPost.getPostsController);
postRouter.get("/details/:postId", identifyUser, createPost.getPostDetailsController);

module.exports = postRouter;

