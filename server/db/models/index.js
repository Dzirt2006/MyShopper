const User = require('./User');
const Pool = require('./Pool');
const Product = require('./Product');
const UsersPools = require('./UsersPools');
const UUID = require ('./UUID');

User.belongsToMany(Pool, { through: UsersPools });
Pool.belongsToMany(User, { through: UsersPools });
Pool.hasMany(Product);

module.exports = {
    User,
    Pool,
    Product,
    UsersPools,
    UUID
}