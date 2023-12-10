const express = require('express')
const bodyParser = require("body-parser");
var cors = require("cors");
const mysql = require('mysql2');
const app = express()
const port = 3001
const userRoute = require("./routes/users");
const categoryRoute = require("./routes/categories")

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
    "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
  })
);



// Create a MySQL connection
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

  app.use("/api/user",userRoute)
  app.use("/api/categories",categoryRoute)
// app.post("api/newregistration",(req,res)=>{
//   // connection.query( 'INSERT INTO members (name, email, address, phone) VALUES (?, ?, ?, ?)',
//   //   [req.body.username, req.body.email, req.body.address, req.body.phone], (err, results) => {
//   //     if (err) {
//   //       console.error('Error executing MySQL query:', err);
//   //       res.status(500).json({ error: 'Internal Server Error' });
//   //       return;
//   //     }
//   //     res.json(results);
//   //   });
//   console.log(req.body)
// })

  // Define API endpoints
app.get('/api/categories', (req, res) => {
    connection.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });

  app.get('/api/books',(req,res)=>{
    connection.query('SELECT * FROM books', (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });

  
  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})