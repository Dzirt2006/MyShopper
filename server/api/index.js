const router = require('express').Router()
module.exports = router;

router.use('/uuid', require('./uuid'));
router.use('/user', require('./user'));
router.use('/pool', require('./pool'));
router.use('/product', require('./product'));