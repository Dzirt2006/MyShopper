const Sequelize = require('sequelize');
const pkg = require('../../package.json')

const databaseName = pkg.name;

const db = new Sequelize(
    process.env.DATABASE_URL ||
    `postgres://postgres:w2w2@localhost:5432/${databaseName}`, 
    {
        logging: false,
        ssl: { rejectUnauthorized: false } //solved the problem with self signed sertificate
    }    
)

module.exports = db;