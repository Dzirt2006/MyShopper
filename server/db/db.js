const Sequelize = require('sequelize');
const pkg = require('../../package.json')
const chalk = require('chalk');

const databaseName = pkg.name;

console.log(chalk.yellow(`Opening database connection to ${databaseName}`));

const db = new Sequelize(
    process.env.DATABASE_URL ||
    `postgres://postgres:w2w2@localhost:5432/${databaseName}`, //
    {
        logging: false
    }
)
module.exports = db;