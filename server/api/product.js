const router = require('express').Router();
const { Pool, Product } = require('../db/models');

module.exports = router;


router.post('/:id', async (req, res, next) => {
    const id = req.params.id; //pool id
    const product = req.body;
    try {
        await Pool.findOne({ where: { id: id } })
            .then(data => data.createProduct(product))
            .then(data => res.json(data));
    } catch (err) {
        next(err);
    }
})

router.put('/:prdctId', async (req, res, next) => {
    const prdctId = req.params.prdctId;  //product id
    try {
        await Product.update(req.body, { where: { id: prdctId } })
            .then(data => res.json(data));
    } catch (err) {
        next(err);
    }
})