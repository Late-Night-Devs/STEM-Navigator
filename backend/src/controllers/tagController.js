const db = require('../models/db');

exports.getTags = (req, res) => {
    console.log("getTAgs");
    db.query("SELECT * FROM Tags", (err, results) => {
        if (err) {
            res.status(500).send("Error in fetching records from Tags");
            return;
        }
        res.json(results);
    });
};
