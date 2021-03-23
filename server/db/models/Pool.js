const Sequelize = require('sequelize');
const db = require('../db')

const Pool = db.define('pool', {
    ownerId: {
        type: Sequelize.INTEGER,
    },
    poolName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

/**
 * pool hook works each time when user add new pool
 * validate do the user have it pool
 * validate variables: poolName, ownerId
 */
Pool.addHook('beforeCreate', async (pool, options) => {
    const poolSearch = pool.dataValues.poolName;
    const userId = pool.dataValues.ownerId;
    await Pool.findOne({
        where: {
            ownerId: userId,
            poolName: poolSearch
        }
    })
        .then(data => {
            if (data) {
                throw new Error('pool already exist!');
            }
        }
        )
});

module.exports = Pool;