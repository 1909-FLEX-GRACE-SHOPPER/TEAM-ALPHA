const chalk = require('chalk');
const Sequelize = require('sequelize');
const dbName = 'AlphaSkiShop'

console.log(chalk.greenYellow(`opening database connection to ${dbName}`));

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
    logging: false,
});

module.exports = db;
