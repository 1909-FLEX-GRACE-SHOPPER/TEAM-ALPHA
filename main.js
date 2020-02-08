const db = require('./server/db/database.js');
const app = require('./server/index');
const chalk = require('chalk');
const PORT = process.env.PORT || 3000;
// db.sync().then(() => {
//   console.log(chalk.greenBright('db synced'));
console.log('port is ', PORT);
const startServer = () =>
  new Promise(res => {
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Application now listening on PORT ${PORT}`)
      );
      res(true);
    });
  });

module.exports = startServer;
