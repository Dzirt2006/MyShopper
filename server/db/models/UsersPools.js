const Sequelize = require('sequelize');
const db = require('../db')
const User = require('./User');
const Pool = require('./Pool');

module.exports = db.define('UsersPools',{
},{ timestamps: false })