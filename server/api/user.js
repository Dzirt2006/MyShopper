const router = require('express').Router();
const { green, red } = require('chalk');
const { User, Pool } = require('../db/models');
const axios = require('axios');
module.exports = router;

router.get('/', async (req, res, next) => {
    const cookieId = req.signedCookies.id ? req.signedCookies.id : null;
    try {
        data = await User.findOne({ where: { cookie_id: cookieId }, include: [Pool] })
        if (!!data) {
            const userName = !!data.userName ? data.userName : "not named yet =(";
            const respondData = { name: userName, pools: data.pools };
            res.json(respondData);
        } else {
            res.json(undefined);
        }
    } catch (err) {
        console.log(red("Can't fetch User", next(err)));
    }

})

router.get('/all', async (req, res, next) => {
    try {
        data = await User.findAll()
        res.json(data);
    } catch (err) {
        console.log(red("Can't fetch User", next(err)));
    }

})

router.post('/', async (req, res, next) => {
    const cookieId = { cookie_id: req.signedCookies.id };
    try {
        await User.create(cookieId)
        const respondData = { name: "not named yet =(", pools: [] };
        res.json(respondData);
    } catch (err) {
        console.log(red("Can't create User", next(err)));
    }
})

//for not signed cookies
function getcookie(req) {
    const cookie = req.headers.cookie;
    return cookie.split('; ');
}