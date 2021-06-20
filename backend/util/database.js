const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'grevis',
  host: 'disdb.mimerhellas.local',
  database: 'grevis',
  password: 'mimer',
  port: 5432,
});

module.exports = pool;