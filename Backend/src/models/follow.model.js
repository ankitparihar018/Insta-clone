const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower:{
        type:String,
    },
    following: {
        type:String,
    },
    status:{
        type:String,
        default:"pending",
        enum: {
        values:["pending","accepted","rejected"],
        message:"Status must be either pending, accepted or rejected"}
    }},{
    timestamps: true
    
})
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model('Follow', followSchema);

module.exports = followModel;