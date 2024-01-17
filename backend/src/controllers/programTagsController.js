const db = require('../models/db');

exports.getProgramTags = (req, res) => {
    db.query("SELECT * FROM ProgramTags", (err, results) => {
        if (err) {
            res.status(500).send("Error in fetching records from ProgramTags");
            return;
        }
        res.json(results);
    });
};
