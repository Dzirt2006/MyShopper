const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('product', {
    name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})