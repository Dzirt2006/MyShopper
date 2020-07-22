const Sequelize = require('sequelize');
const db = require('../db')
const User = require('./User');
const Pool = require('./Pool');

module.exports = db.define('UsersPools',{
    // userId:{
    //     type:Sequelize.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // },
    // poolId:{
    //     type:Sequelize.INTEGER,
    //     references: {
    //         model: Pool,
    //         key: 'id'
    //     }
    // }
},{ timestamps: false })