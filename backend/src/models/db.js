const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Checking the connection from the backend server to MySQL
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL server:", err);
        throw err;
    } else {
        console.log("Connected to the MySQL server.");
    }
});

module.exports = connection;
