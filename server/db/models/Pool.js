const Sequelize = require('sequelize');
const db = require('../db')


const Pool = db.define('pool', {
    usersQ: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    poolName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Pool.addHook('beforeCreate', async (pool, options) => {
    const poolSearch = pool.dataValues.poolName;
    await Pool.findAll({ where: {poolName:poolSearch} })
        .then(data => {
            if (data[0]) {
                throw new Error('pool already exist!');
            }
        })
});

module.exports = Pool;