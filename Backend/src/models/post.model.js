const mongoose= require  ("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgURL:{
        type: String,
        required: [true, "Please provide an image URL"],
    },
    userId:{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "Please provide a user ID"],
    }

})

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;