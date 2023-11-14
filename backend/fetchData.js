const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const port = 3000;

// MySQL database connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my-secret", // Replace with your password
  database: "db", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the MySQL server.");
});

// Serve static files (HTML, JS, CSS)
// mapping to the public file of the frontend folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Fetch data from the Programs table
app.get("/programs", (req, res) => {
  db.query("SELECT * FROM Programs", (err, results) => {
    if (err) {
      res.status(500).send("Error in fetching records from Programs");
      return;
    }
    res.json(results);
  });
});

// Fetch data from the ProgramTags table
app.get("/program-tags", (req, res) => {
  db.query("SELECT * FROM ProgramTags", (err, results) => {
    if (err) {
      res.status(500).send("Error in fetching records from ProgramTags");
      return;
    }
    res.json(results);
  });
});

// Fetch data from the Tags table
app.get("/tags", (req, res) => {
  db.query("SELECT * FROM Tags", (err, results) => {
    if (err) {
      res.status(500).send("Error in fetching records from Tags");
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
