const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../controllers/thought-controller.js');

// /api/thoughts/
router.route('/').get(getAllThoughts);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:userId
router.route('/:userId').post(createThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions').post(createReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);


module.exports = router;