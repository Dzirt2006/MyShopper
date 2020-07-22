const router = require('express').Router();
const { green, red } = require('chalk');
const { User, Pool } = require('../db/models');
const axios = require('axios');
module.exports = router;

router.post('/', async (req, res, next) => {
    const cookieId = req.signedCookies.id ? req.signedCookies.id : null;
    const poolName = req.body;
    console.log("IN", cookieId,'body',poolName);
    try {
        data = await User.findOne({ where: { cookie_id: cookieId }})
        .then(user=>user.createPool(poolName))
        
    } catch (err) {
        console.log(red("Can't fetch User", next(err)));
    }
})
