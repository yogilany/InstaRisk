const fs = require(`fs`);
const appRoot = require(`app-root-path`);

try {
  const CONFIG_FILE_PATH = `${appRoot}/config.json`;

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, `utf8`));

  module.exports = config;
} catch (err) {
  module.exports = {
    database: {
      dialect: process.env.DATABASE_DIALECT || `pg`,
      host: process.env.DATABASE_HOST || `localhost`,
      minconnections: process.env.DATABASE_MINCONNECTIONS || 2,
      name: process.env.DATABASE_NAME || `ocat`,
      password: process.env.DATABASE_PASSWORD || `postgres`,
      port: process.env.DATABASE_PORT || 5432,
      username: process.env.DATABASE_USERNAME || `postgres`,
    },
    server: {
      port: process.env.SERVER_PORT || 3000,
    },
  };
}
