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
    //Enter Your mysql password *********************
    password: '',
    database: 'election'
  },
  console.log('Connected to the election database')
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});


app.get("/", (req, res) => {
  res.json({                        //send response msg back to the client
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
