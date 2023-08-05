const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rinkal",
    database: "prac",
    connectionLimit: 10,
    authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth_plugins/mysql_native_password').sha256_password
    }
});

app.get('/employees', (req, res) => {
    pool.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(result);
        }
    });
});

// Define route to serve index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

