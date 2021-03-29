const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'node-complete',
    password: 'password'
});

module.exports = pool.promise();