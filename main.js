const db = require('./server/db/database.js');
const app = require('./server/index');
const chalk = require('chalk');
const PORT = 3000;
db.sync()
  .then(() => {
    console.log(chalk.greenBright('db synced'));
    app.listen(PORT, () =>
      console.log(
        chalk.greenBright(
          `Application now listening on PORT ${PORT} at http://localhost:${PORT}`
        )
      )
    );
  })
  .catch(e => {
    console.log(chalk.red('connection error', e));
  });
