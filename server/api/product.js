const router = require('express').Router();
const axios = require('axios');
const { Pool, Product } = require('../db/models');

module.exports = router;


router.post('/:id', async (req, res, next) => {
    const id = req.params.id;
    const product = req.body;
    console.log(id)
    try {
        await Pool.findOne({ where: { id: id } })
            .then(data => data.createProduct(product))
            .then(data => res.json(data));
    } catch (err) {
        console.log('Can not create new product', next(err));
    }
})