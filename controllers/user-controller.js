const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find();
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error." });
        }
    }, 

    async getUserById(req, res) {
        try {
            const dbUserData = await User.findById({_id: req.params.userId}).select("-__v");

            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error." });
        }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateUserById(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true});
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async deleteUserById(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({_id: req.params.userId});
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            await Thought.deleteMany({_id: { $in: dbUserData.thoughts}});
            res.json({ message: 'User and thoughts deleted successfully!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body.userId}},
                {runValidators: true, new: true}
            );
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json({message: 'Friend added successfully!'});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json({message: 'Friend removed successfully!'});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};

