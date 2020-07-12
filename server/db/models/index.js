const User = require('./User');
const Pool = require('./Pool');
const Product = require('./Product');

User.belongsToMany(Pool, { through: 'UsersPools' });
Pool.hasMany(Product);

module.exports = {
    User,
    Pool,
    Product
}