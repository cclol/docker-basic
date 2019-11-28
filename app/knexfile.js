
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'db',
      user: '123',
      password: '123',
      database: 'test'
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './data/seeds'},
    pool: { min: 0, max: 7 }
  },
};
