const router = require('express').Router();
const { red } = require('chalk');
const { User, Pool, Product } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
    const user = req.user;
    const poolName = req.body;
    try {
        data = await User.findOne({ where: { googleId: user.googleId }})
            .then(user => user.createPool(poolName))
            .then(pool => res.json({ id: pool.id, poolName: pool.poolName }));
    } catch (err) {
        console.log(red("Can't create relation", next(err)));
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const user = req.user;
    try {
      const data =  await Pool.findOne({ where: { id: id }, include: [Product] })
      const promise= await data.hasUser(user)
           if(promise){
            res.json(data)
           }else{
            res.sendStatus(505);
           }     
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


