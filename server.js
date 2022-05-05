const express = require("express");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect the application to mysql database
const db = mysql.createConnection(
  {
    host: 'localhost',
    //Your mysql username
    user: 'root',
    //Enter Your mysql password 
    password: 'Zelda321',
    database: 'election'
  },
  console.log('Connected to the election database')
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

//GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

//Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//Create a candidate
const sql =  `INSERT INTO candidates (id, first_name, last_name, industry_connected)
  VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if(err) {
    console.log(err);
  }
  console.log(result);
});


app.get("/", (req, res) => {
  res.json({                   //send response msg back to the client
    message: "Hello world",
  });
});

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//start the express.js server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
