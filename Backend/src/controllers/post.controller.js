const postModel = require ("../models/post.model.js");
const ImageKit  = require ('@imagekit/nodejs');
const {toFile} = require("@imagekit/nodejs")
const jwt = require ("jsonwebtoken");


const imagekit = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
    
});


async function createPostController(req, res) {
    console.log(req.body,req.file);
    
    

    const file = await imagekit.files.upload({
         file: await toFile(Buffer.from(req.file.buffer), 'file'),
         fileName: 'Text',
         folder: "insta-clone-posts"
    });
    const post = await postModel.create({
        userId: req.user.id,
        caption: req.body.caption,
        imgURL: file.url,
    });
    res.status(201).json({message:"Post created successfully", post});
}
async function getPostsController(req, res) {
    
    const userId = req.user.id;
    const posts = await postModel.find({userId: userId});

    res.status(200).json({message:"Posts fetched successfully", posts});
}
async function getPostDetailsController(req, res) {
    
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await postModel.findOne({userId: userId, _id: postId});

    if(!post){
        return res.status(404).json({message:"Post not found"});
    }
    const isValidUser = post.userId.toString() === userId.toString();
    if(!isValidUser){
        return res.status(403).json({message:"Forbidden"});
    }

    res.status(200).json({message:"Post details fetched successfully", post});
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController
}

