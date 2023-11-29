const db = require('../models/db');

// Fetch data from the Programs table
exports.getPrograms = (req, res) => {
    console.log("GET Request for Programs", req.body);

    db.query("SELECT * FROM Programs", (err, results) => {
        if (err) {
            res.status(500).send("Error in fetching records from Programs");
            return;
        }
        res.json(results);
    });
};

exports.filterPrograms = (req, res) => {
    const tagIds = req.body.tagIds || [];
    console.log("filterPrograms - Request Body:", req.body);

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
};
