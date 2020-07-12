const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('pool', {
    users: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

//add function add users to pool
// delete pool and all related product in 3 day after complete