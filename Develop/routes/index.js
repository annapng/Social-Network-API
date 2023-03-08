const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughtRoutes = require('./thought-routes.js');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;