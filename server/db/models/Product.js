const Sequelize = require('sequelize');
const db = require('../db')
const Pool = require('./Pool');



const Product = db.define('product', {
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: {
        //     args: true,//fix for poolID
        //     msg: 'product already exist!'
        // }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    poolId: {
        type: Sequelize.INTEGER,
        references: {
            model: Pool,
            key: 'id'
        }
    }
})


//this hook checks is it any record in the table 
//with the same Name and poolId
// if true ->trow error

Product.addHook('beforeCreate', async (product, options) => {
    const productSearch = product.dataValues.productName;
    const idSearch = product.dataValues.poolId;
    await Product.findAll({ attributes: ['productName'], where: { poolId: idSearch, productName: productSearch } })
    .then(data=>{
        if(data[0]){
            throw new Error('product already exist!');
        }
    })
});

module.exports = Product;