const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');


async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const isFolloweeExists = await userModel.findOne({ username: followeeUsername });
    if (!isFolloweeExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        following: followeeUsername
    });

    if (isAlreadyFollowing) {
        return res.status(400).json({ message: "You are already following this user" });
    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        following: followeeUsername,

    });
    res.status(201).json({ message: `You are now following ${followeeUsername}`, follow: followRecord });
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const isFolloweeExists = await userModel.findOne({ username: followeeUsername });
    if (!isFolloweeExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const followRecord = await followModel.findOneAndDelete({
        follower: followerUsername,
        following: followeeUsername
    });

    if (!followRecord) {
        return res.status(400).json({ message: "You are not following this user" });
    }

    res.status(200).json({ message: `You have unfollowed ${followeeUsername}`, follow: followRecord });
}

module.exports = { followUserController, unfollowUserController };