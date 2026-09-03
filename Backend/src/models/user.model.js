const mongoose= require  ("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true,"Username already exists"],
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: [true,"Email already exists"],
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
    },
    profilePicture:{
        type: String,
        default: "https://ik.imagekit.io/bxl1ee4qi/instaProfile.png?updatedAt=1771354319094",
    },
    bio: String,

})
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;