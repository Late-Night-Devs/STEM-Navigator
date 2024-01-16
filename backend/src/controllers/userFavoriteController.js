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

exports.addFavoriteProgram = (req, res) => {
    const { userID, programID } = req.body;
    console.log("Add Favorite Program for a UserID:", userID);

    // Check if the record already exists
    db.query("SELECT * FROM UserFavorites WHERE user_id = ? AND program_id = ?", [userID, programID], (selectErr, selectResults) => {
        if (selectErr) {
            res.status(500).send("Error in checking for existing record in UserFavorites");
            return;
        }

        if (selectResults.length > 0) {
            res.status(409).json({ message: 'Record with this userID and programID already exists in UserFavorites' });
            return;
        }

        // If the record doesn't exist, insert a new one
        db.query("INSERT INTO UserFavorites (user_id, program_id) VALUES (?, ?)", [userID, programID], (insertErr, insertResults) => {
            if (insertErr) {
                res.status(500).send("Error in adding a new record to UserFavorites");
                return;
            }

            res.json({ message: 'Record added successfully to UserFavorites', userFavorite: { userID, programID } });
        });
    });
};

exports.removeFavoriteProgram = (req, res) => {
    const { userID, programID } = req.body;
    console.log("Remove Favorite Program for a UserID:", userID);

    // Check if the record exists
    db.query("SELECT * FROM UserFavorites WHERE user_id = ? AND program_id = ?", [userID, programID], (selectErr, selectResults) => {
        if (selectErr) {
            res.status(500).send("Error in checking for the record in UserFavorites");
            return;
        }

        if (selectResults.length === 0) {
            res.status(404).json({ message: 'Record with this userID and programID not found in UserFavorites' });
            return;
        }

        // If the record exists, remove it
        db.query("DELETE FROM UserFavorites WHERE user_id = ? AND program_id = ?", [userID, programID], (deleteErr, deleteResults) => {
            if (deleteErr) {
                res.status(500).send("Error in removing the record from UserFavorites");
                return;
            }

            res.json({ message: 'Record removed successfully from UserFavorites', userFavorite: { userID, programID } });
        });
    });
};
