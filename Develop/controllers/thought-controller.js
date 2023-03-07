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
                !thought 
                    ? res.status(404).json({message: 'No thoughts with this particular ID!'})
                    : res.json(thought)
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
        Thought.findOneAndUpdate({ _id: req.params.id })
            .then((reaction) => {
                if (!reaction){
                    res.status(404).json({ message: 'No Thought with that ID' }) } 
                else 
            
                    { reaction.reactions.push(req.body);
                    res.json({ message: 'Thought added!' })}
                        } )
            .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                      })
    },
    // Delete a Reaction by reactionID value
    deleteReaction(req, res) {
        Thought.findOneAndDelete( { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}}, { new: true}
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({message: 'No thoughts with this particular ID!'});
                    return;
                }
                res.json(thought);
                 })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                  }) 
        }
     }









