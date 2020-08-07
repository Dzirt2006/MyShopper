const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    defaultValue:"not named yet =("
  },
  cookie_id: {
    type: Sequelize.STRING,
    allowNull: false
  }
})