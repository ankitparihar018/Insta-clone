const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
    }
},{
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model('Like', likeSchema);

module.exports = likeModel;