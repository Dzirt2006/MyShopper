const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('uuid', {
    uuid:{
        type:Sequelize.STRING,
        allowNull:false
    },
    poolId:{
        type: Sequelize.INTEGER,
        allowNull:false
    }

})

