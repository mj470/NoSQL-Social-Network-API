const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

    userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });
    const User = model('User', userSchema);
    module.exports = User;