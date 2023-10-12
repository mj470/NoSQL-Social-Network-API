const { User } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({});
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error." });
        }
    }, 

    async getUserById({params}, res) {
        try {
            const dbUserData = await User.findById(params.userId);
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error." });
        }
    },

    async createUser({body}, res) {
        try {
            const dbUserData = await User.create(body);
            res.status(201).json(dbUserData); // 201 for resource creation
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message }); // Validation or bad request errors usually have a 400 status
        }
    },

    async updateUserById({params, body}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({_id: params.userId}, body, {new: true});
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    },

    async addFriend({params}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: params.userId},
                {$addToSet: {friends: params.friendId}},
                {new: true}
            );
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json({message: 'Friend added successfully!'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error." });
        }
    },

    async removeFriend({params}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {friends: params.friendId}},
                {new: true}
            );
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json({message: 'Friend removed successfully!'});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error." });
        }
    },
};

module.exports = userController;