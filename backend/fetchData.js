const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// support input req for the body as JSON
app.use(express.json());

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
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Fetch data from the Programs table
app.get("/programs", (req, res) => {
  console.log("Request Body:", req.body);

  db.query("SELECT * FROM Programs", (err, results) => {
    if (err) {
      res.status(500).send("Error in fetching records from Programs");
      return;
    }
    res.json(results);
  });
});

app.post("/programs/filter", (req, res) => {
  const tagIds = req.body.tagIds || [];
  console.log("Request Body:", req.body);

  if (tagIds.length > 0) {
    const placeholders = tagIds.map(() => "?").join(",");
    const sqlQuery = `
      SELECT p.* FROM Programs p
      JOIN ProgramTags pt ON p.program_id = pt.program_id
      WHERE pt.tag_id IN (${placeholders})
      GROUP BY p.program_id
      HAVING COUNT(DISTINCT pt.tag_id) = ?  -- Ensure all selected tags are present
    `;

    db.query(sqlQuery, [...tagIds, tagIds.length], (err, results) => {
      if (err) {
        res.status(500).send("Error in fetching filtered programs");
        return;
      }
      res.json(results);
    });
  } else {
    // If no tag IDs are provided, return all programs
    db.query("SELECT * FROM Programs", (err, results) => {
      if (err) {
        res.status(500).send("Error in fetching programs");
        return;
      }
      res.json(results);
    });
  }
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
