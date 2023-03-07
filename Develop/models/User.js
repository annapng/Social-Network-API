const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/, // Moongoose's matching validation for email
        },
        thoughts: [{
            type: Schema.Types.ObjectID,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectID,
            ref: 'User',
        }],
        
    }, {

    toJSON: {
        virtuals: true,
    },
    id: false,
}
)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query

UserSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });


const User = model('User', UserSchema);

module.exports = User;