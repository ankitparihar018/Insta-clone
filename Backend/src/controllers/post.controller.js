const postModel = require ("../models/post.model.js");
const ImageKit  = require ('@imagekit/nodejs');
const {toFile} = require("@imagekit/nodejs")
const jwt = require ("jsonwebtoken");


const imagekit = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
    
});


async function createPostController(req, res) {
    console.log(req.body,req.file);
    
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    let decoded = null;
    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }


    const file = await imagekit.files.upload({
         file: await toFile(Buffer.from(req.file.buffer), 'file'),
         fileName: 'Text',
         folder: "insta-clone-posts"
    });
    const post = await postModel.create({
        userId: decoded.id,
        caption: req.body.caption,
        imgURL: file.url,
    });
    res.status(201).json({message:"Post created successfully", post});
}

module.exports = {
    createPostController
}

