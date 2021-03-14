const pg = require('pg');

const config = { database: 'test_db', host: 'localhost', port: 5432 };

const pool = new pg.Pool(config);

pool.on('connect', (client) => {
  console.log('connected to postgres');
});
pool.on('error', (error, client) => {
  console.log('Error: Connecting to postgres', error);
  process.exit(-1);
});

module.exports = pool;
