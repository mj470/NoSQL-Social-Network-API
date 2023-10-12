const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find().populate('reactions');
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getThoughtById({params}, res) {
        try {
            const dbThoughtData = await Thought.findOne({_id: params.id}).populate('reactions');
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async createThought({body}, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            res.status(200).json(dbThoughtData);    
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteThought({params}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({_id: params.id});
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async updateThought({params, body}, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate({_id: params.id}, body, {new: true});
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addReaction({params, body}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$addToSet: {reactions: body}},
                {runValidators: true, new: true}
            );
            dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({message: 'No thought found with this id!'});
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteReaction({params}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull: {reactions: {reactionId: params.reactionId}}},
                {runValidators: true, new: true}
            );
            dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({message: 'No thought found with this id!'});
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
};

module.exports = thoughtController;

