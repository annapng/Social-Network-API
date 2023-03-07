const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../controllers/user-controller.js');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:Id
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:Id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;