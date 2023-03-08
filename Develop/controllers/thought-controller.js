const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
              }) 
    },
    // Get a single thought by Id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .select('-__V')
        .then((thought) => (
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({_id}) => {
             return User.findOneAndUpdate({ _id: req.params.id}, {$push: {thought: _id}}, {new: true});
            })
            .then((thought) => {
                res.json({ message: 'Thought created!' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Update a thought by it's _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id},
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => (
                !thought
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(thought)
            ))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
    },
    // Delete a thought by it's _id
    deleteThought(req, res) {
        Thought.findOneAndDelete( { _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json({ message: 'Thought deleted!' })
                )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                      }) 
    },
    // Post to create a reaction stored in a single thought's reactions array field
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id})
        .then((data) => {
            !data
            ? res.status(404).json({ message: 'Thought not found.' })
            : res.json({ message: 'Reaction created!' });
           })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
                  }) 
    },
    // Delete a Reaction by reactionID value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new : true})
        .then(thought => {
            res.json('Reaction deleted!');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
                  }) 
    } 
}