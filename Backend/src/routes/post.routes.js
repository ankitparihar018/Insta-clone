const express = require ("express");
const postRouter = express.Router();
const createPost =require ("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

postRouter.get("/", upload.single("image"), createPost.createPostController);

module.exports = postRouter;

