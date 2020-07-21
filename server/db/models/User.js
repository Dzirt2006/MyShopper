const Sequelize = require('sequelize');
const db = require('../db')


module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  cookie_id: {
    type: Sequelize.STRING,
    allowNull: false
  }
})