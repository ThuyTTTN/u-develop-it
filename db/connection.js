const mysql = require("mysql2");

//Connect the application to mysql database
const db = mysql.createConnection(
    {
      host: "localhost",
      //Your mysql username
      user: "root",
      //Enter Your mysql password
      password: "Zelda321",
      database: "election",
    },
    console.log("Connected to the election database")
  );

  module.exports = db;