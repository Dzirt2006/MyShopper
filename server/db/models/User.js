const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    defaultValue:"not named yet =("
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    // defaultValue: '/loggin.png'
  },
  googleId:{
    type: Sequelize.STRING
  }
})