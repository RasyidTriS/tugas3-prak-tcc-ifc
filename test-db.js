require('dotenv').config();
const mysql = require('mysql2');

console.log("Mencoba terhubung ke:", process.env.DB_HOST);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('\n❌ KONEKSI GAGAL!');
        console.error('Kode Error:', err.code);
    } else {
        console.log('\n✅ KONEKSI BERHASIL!');
        connection.release();
    }
    process.exit();
});