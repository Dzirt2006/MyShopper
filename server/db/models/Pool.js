const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('pool', {
    usersQ: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    poolName:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

