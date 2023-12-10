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


router.post('/newregistration',(req,res)=>{
    connection.query( 'INSERT INTO members (name, email, address, phone) VALUES (?, ?, ?, ?)',
    [req.body.username, req.body.email, req.body.address, req.body.phone], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  })

  router.post('/addBook',(req,res)=>{
    connection.query( 'INSERT INTO books (title, author, publication_year, available, category_id) VALUES (?, ?, ?, ?,?)',
    [req.body.title, req.body.author, req.body.year, req.body.available,req.body.category], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  })

  router.post('/deleteuser',(req, res) => {
    connection.query(`DELETE FROM members WHERE id =${req.body.userid} `, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  })

  router.get('/finduser',(req, res) => {
    connection.query(`SELECT * FROM members WHERE id=${req.query.userid}`, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });

  })

  router.post('/borrowbooks',(req, res) => {
    connection.query( 'INSERT INTO loans ( book_id, member_id, loan_date, return_date) VALUES (?, ?, ?, ?)',
    [req.body.bookID, req.body.memberid, req.body.loan_date, req.body.returnDate], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });   

  })

  router.get('/userBorrowed',(req, res) => {
   
    connection.query(`SELECT * FROM loans WHERE member_id=${req.query.userid}`, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      else{
        let borrowed = []
        results.map((loans)=>{
          let bookid = loans.book_id
          connection.query(`SELECT * FROM books WHERE id=${bookid}`, (err1, results1) => {
            if (err1) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
            if(!borrowed.includes(results1[0])){
              borrowed.push(results1[0])
            }
          });
        })
        setTimeout(() => {
          res.status(200).json({books:borrowed})

        }, 3000);

      }
    });
    

  })





  module.exports = router;