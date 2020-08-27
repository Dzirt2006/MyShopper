const router = require('express').Router();
const { UUID, Pool, User } = require('../db/models');
module.exports = router;

router.post('/new_uuid', async (req, res, next) => {
    try {
        await UUID.create(req.body)
            .then(() => res.sendStatus(200));
    } catch (err) {
        next(err);
    }

})

router.post('/use_uuid', async (req, res, next) => {
    const user = req.user;
    const uuidInpt = req.body.uuid
    try {
        let data = await UUID.findOne({ where: { uuid: uuidInpt } })
        const pool = await Pool.findOne({ where: { id: data.poolId } });
        await User.findOne({ where: { googleId: user.googleId } })
            .then(user => user.addPool(pool))
        data = await User.findOne({ where: { googleId: user.googleId }, include: [Pool] })
        res.json(data);
    } catch (err) {
        next(err);
    }
})

