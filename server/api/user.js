const router = require('express').Router();
const { green, red } = require('chalk');
const { User, Pool } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
    const user = req.user;
    try {
        const wholeUser = await User.findOne({ where: { googleId: user.googleId }, include: [Pool] })
        res.json(wholeUser)
    } catch (err) {
        console.log(red("Can't fetch User", next(err)));
    }

})

router.post('/:id', async (req, res, next) => {
    const user = req.user;
    const refId = req.params.id
    try {
        const pool = await Pool.findOne({ where: { id: refId } });
        await User.findOne({ where: { googleId: user.googleId } })
            .then(user => user.addPool(pool))
        data = await User.findOne({ where: { googleId: user.googleId }, include: [Pool] })
        res.json(data);
    } catch (err) {
        console.log(red("Can't create User", next(err)));
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

// router.post('/', async (req, res, next) => {
//     const cookieId = { cookie_id: req.signedCookies.id };
//     try {
//         await User.create(cookieId)
//         const respondData = { name: "not named yet =(", pools: [] };
//         res.json(respondData);
//     } catch (err) {
//         console.log(red("Can't create User", next(err)));
//     }
// })





// await Pool.findOne({ where: { id: req.params.id } })
// .then(pool => data[0].addPool(pool));

//for not signed cookies
function getcookie(req) {
    const cookie = req.headers.cookie;
    return cookie.split('; ');
}