const chalk = require('chalk');
const Sequelize = require('sequelize');
const dbName = 'alpha_ski_shop';

console.log(chalk.yellowBright(`opening database connection to ${dbName}`));

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false
  }
);

module.exports = db;
