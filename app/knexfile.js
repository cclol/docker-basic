const dotenv = require('dotenv');
dotenv.config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './data/seeds'},
    pool: { min: 0, max: 7 }
  },
};
