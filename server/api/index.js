const router = require('express').Router()
module.exports = router;


router.use('/user',require('./user'));
router.use('/pool',require('./pool'));
router.use('/product',require('./product'));