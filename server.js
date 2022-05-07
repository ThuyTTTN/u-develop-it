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


//adding routes for all parties
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message});
      return;
    }
    res.json ({
      message: 'success',
      data: rows
    });
  });
});


// Get single party; adding route that includes an id parameter for a single party
app.get('/api/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// delete route will give you the opportunity to test the 'ON DELETE SET NULL'
app.delete('/api/party/:id', (req, res) => {
  const sql =  `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      //checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({ 
        message: 'Party not found'
      });
    } else {
      res.json({ 
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

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