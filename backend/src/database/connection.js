const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOSTNAME,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

module.exports = connection;