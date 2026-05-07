const mysql = require('mysql2');

const connection = mysql.createPool({
    host: '34.172.113.167',
    user: 'admin',
    password: 'mypassword',
    database: 'notes_123230043'
});

module.exports = connection.promise();