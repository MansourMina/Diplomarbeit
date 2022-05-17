const { Pool } = require('pg');

const pool = new Pool({
  max: 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

module.exports = {
  query: (text, param) => pool.query(text, param),
};
