const { User, Thought } = require('../models');

module.exports = {
    // Get All Users
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Get a Single User By Id with Data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__V')
            .then((user) => (
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
                ))
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                      }) 
    },
    // Post a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Put to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => (
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Delete to remove a user by their _id, including user's associated thoughts 
    deleteUser(req, res) {
        User.findOneAndDelete( { _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
                )
                .then(() => res.json({ message: 'User and their thoughts deleted!' }))
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                      }) 
    },
    // Post to add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate( { _id: req.params.id},
          //  { friends: { $ne: req.params.friendId }},
            { $push : { friends: req.params.friendId }},
            { new: true, unique: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Delete / Remove a friend from a user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate( { _id: req.params.id},
            { $pull : { friends: req.params.friendId }},
            { new: true, unique: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    }
};