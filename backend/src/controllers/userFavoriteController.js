const db = require('../models/db');

exports.getAllFavorites = (req, res) => {
    console.log("getAllFavorites");
    db.query("SELECT * FROM UserFavorites", (err, results) => {
        if (err) {
            res.status(500).send("Error in fetching records from UserFavorites");
            return;
        }
        res.json(results);
    });
};
