const express = require("express");
// const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);



// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });



//GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });


//Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//   VALUES (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


// app.get("/", (req, res) => {
//   res.json({
//     //send response msg back to the client
//     message: "Hello world",
//   });
// });

//Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});