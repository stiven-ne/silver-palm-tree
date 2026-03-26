const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      
  password: '',      
  database: 'silver_palm_tree',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();