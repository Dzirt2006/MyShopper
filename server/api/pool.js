const router = require('express').Router();
const { green, red } = require('chalk');
const { User, Pool, Product } = require('../db/models');
const axios = require('axios');
module.exports = router;

router.post('/', async (req, res, next) => {
    const cookieId = req.signedCookies.id ? req.signedCookies.id : null;
    const poolName = req.body;
    try {
        data = await User.findOne({ where: { cookie_id: cookieId } })
            .then(user => user.createPool(poolName))
            .then(pool => res.json({ id: pool.id, poolName: pool.poolName }));
    } catch (err) {
        console.log(red("Can't fetch User", next(err)));
    }
})


router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await Pool.findOne({ where: { id: id }, include: [Product] })
            .then(data => res.json(data));
    } catch (err) {
        console.log(red("Can't fetch Pool by ID", next(err)));
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await Pool.destroy({ where: { id: id } })
        res.sendStatus(200)
    } catch (err) {
        console.log(red("Can't delete Pool", next(err)));
    }
})


