const router = require('express').Router();
const { User, Pool, Product } = require('../db/models');
module.exports = router;

/**
 * creates a new pool trough the user
 */
router.post('/', async (req, res, next) => {
    const user = req.user;//get user data fro passport
    const pool= {...req.body,ownerId:user.id};// req.body contains poolName create a new obj with poolName and ownerId fields
    try {
        data = await User.findOne({ where: { googleId: user.googleId } })
            .then(user => user.createPool(pool))
            .then(pool => res.json({ id: pool.id, poolName: pool.poolName }));
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const user = req.user;
    try {
        const data = await Pool.findOne({ where: { id: id }, include: [Product] })
        const promise = await data.hasUser(user)
        if (promise) {
            res.json(data)
        } else {
            res.sendStatus(505);
        }
    } catch (err) {
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await Pool.destroy({ where: { id: id } })
        res.sendStatus(200)
    } catch (err) {
        next(err);
    }
})



// uncomment for debuging
// router.get('/', async (req, res, next) => {
//     try {
//         const data = await Pool.findAll({ where: {}, include: [Product] })
      
//         if (data) {
//             res.json(data)
//         } else {
//             res.sendStatus(505);
//         }
//     } catch (err) {
//         next(err);
//     }
// })
