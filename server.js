const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
