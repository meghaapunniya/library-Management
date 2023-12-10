const express = require("express");
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Vinodhiny#1',
  database: 'library_management'
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

router.get('/getcategories',(req, res) => {
    connection.query(`SELECT * FROM categories`, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  })

  module.exports = router;