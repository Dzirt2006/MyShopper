const router = require('express').Router();
const { Pool, Product } = require('../db/models');

module.exports = router;


router.post('/:id', async (req, res, next) => {
    const id = req.params.id; //pool id
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

router.put('/:id',async (req,res,next)=>{
    const id = req.params.id;  //product id
try{
    await Product.update(req.body,{where:{id:id}})
    .then(data=>res.json(data));
}catch(err){
    next(err);
}
})