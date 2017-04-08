const pg = require('pg');
const { PG_CONFIG } = require('../config');
console.log('PG_CONFIG: host = ' + PG_CONFIG.host);
console.log('PG_CONFIG: user = ' + PG_CONFIG.user);
console.log('PG_CONFIG: db   = ' + PG_CONFIG.database);
console.log('PG_CONFIG: PORT = ' + PG_CONFIG.port);

const pool = new pg.Pool(PG_CONFIG);

pool.connect((err) => {
  if (err) console.error(err);

  else console.log('Successfully connected to dittiodb!');
});

module.exports = pool;
