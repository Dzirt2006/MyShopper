const router = require('express').Router();
const { User, Pool } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
    const user = req.user;
    try {
        const wholeUser = await User.findOne({ where: { googleId: user.googleId }, include: [Pool] })
        res.json(wholeUser)
    } catch (err) {
        next(err);
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
        next(err);
    }
})

