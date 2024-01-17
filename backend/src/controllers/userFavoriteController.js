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
    console.log("Adding Favorite Program for a UserID and programID:", userID, programID);

    // Check if the user with the given user_id exists in the Users table
    db.query("SELECT * FROM Users WHERE user_id = ?", [userID], (userErr, userResults) => {
        if (userErr) {
            console.error("Error checking if user exists:", userErr);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (userResults.length === 0) {
            console.error("User with user_id", userID, "does not exist.");
            res.status(404).json({ message: 'User not found with the given user_id in database' });
            return;
        }

        // If the user exists, insert a new record into UserFavorites
        db.query("INSERT INTO UserFavorites (user_id, program_id) VALUES (?, ?)", [userID, programID], (insertErr, insertResults) => {
            if (insertErr) {
                console.error("Error in adding a new record to UserFavorites:", insertErr);
                res.status(500).send("Internal Server Error");
                return;
            }

            console.log("Record added successfully to UserFavorites:", { userID, programID });
            res.json({ message: 'Record added successfully to UserFavorites', userFavorite: { userID, programID } });
        });
    });
};

exports.removeFavoriteProgram = (req, res) => {
    const { userID, programID } = req.body;
    console.log("Remove Favorite Program for a UserID:", userID);

    // Check if the record exists
    db.query("SELECT * FROM UserFavorites WHERE user_id = ? AND program_id = ?", [userID, programID], (err, results) => {
        if (err) {
            res.status(500).send("Error in checking for the record in UserFavorites");
            return;
        }

        if (results.length === 0) {
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
