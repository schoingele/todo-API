const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_db',
  password: 'rodrigo021',
  port: 5433
});
module.exports = pool;
