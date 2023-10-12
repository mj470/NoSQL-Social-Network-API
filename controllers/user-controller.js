const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    }, 
    getUserById({params}, res) {
        User.findById(req.params.userId)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    updateUserById({params, body}, res) {
        User.findOneAndUpdate({_id: params.userId}, body, {new: true})
        .then(dbUserData => {
            if (!dbUserData) {
               return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json({message: 'User updated successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json({message: 'Friend added successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            const removed = !dbUserData.friends.includes(params.friendId);
            if (removed) {
                res.json({message: 'Friend removed successfully!'});
            } else {
                res.json(dbUserData);
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
};

module.exports = userController;