const { Thought, User } = require('../models');
const {Types} = require('mongoose');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find();
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({_id: req.params.id});
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: dbThoughtData._id}},
                {new: true}
            );
            if (!user) {
                return res.status(404).json({message: 'Thought created but no user found with this id!'});
            }
            res.json(dbThoughtData);    
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtid}, 
                {$set: req.body},
                {runValidators: true, new: true}
                
                );
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            const user = await User.findOneAndUpdate(
                {_id: dbThoughtData.userId},
                {$pull: {thoughts: dbThoughtData._id}},
                {runValidators: true, new: true}
            );
            if (!user) {
                return res.status(404).json({message: 'Thought deleted but no user found with this id!'});
            }
            res.json({message: 'Thought deleted successfully!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json({message: 'Reaction deleted successfully!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;

