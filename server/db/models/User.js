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
    defaultValue: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/08/388x210_Are_Apple_Seeds_Poisonous-1.jpg?w=756&h=567'
  },
  googleId:{
    type: Sequelize.STRING
  }
})