const db = require('../models/db');

exports.getAllUsers = (req, res) => {
    console.log("getAllUsers");
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) {
            res.status(500).send("Error in fetching records from Users");
            return;
        }
        res.json(results);
    });
};
