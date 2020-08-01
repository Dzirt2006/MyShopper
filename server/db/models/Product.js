const Sequelize = require('sequelize');
const db = require('../db')
const Pool = require('./Pool');



const Product = db.define('product', {
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'product already exist!'
        }
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

Product.addHook('beforeValidate', async (product, options) => {
    // const products = await Product.findAll({ attributes: ['productName'], where: { poolId: product.dataValues.poolId } });

});

module.exports = Product;