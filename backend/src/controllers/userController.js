const db = require('../models/db');

exports.getAllUsers = (req, res) => {
    console.log("GET Req: get all users");
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) {
            res.status(500).send("Error in fetching records from Users");
            return;
        }
        res.json(results);
    });
};

// exports.findUserID = (req, res) => {
//     const { email } = req.query;
//     console.log(`GET Req: find user ID for email - ${email}`);

//     db.query("SELECT user_id FROM Users WHERE email = ?", [email], (err, results) => {
//         if (err) {
//             res.status(500).send("Error in fetching user ID from Users");
//             return;
//         }

//         if (results.length === 0) {
//             res.status(404).json({ message: 'User not found with this email' });
//             return;
//         }

//         const userID = results[0].user_id;
//         res.json({ userID });
//     });
// };

exports.checkEmailExists = (req, res) => {
    const { email } = req.query;

    // Validate email format if needed

    // Check if the email exists in the database
    db.query('SELECT user_id FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Log the entire results array for inspection
        console.log("Backend: results from check email: ", results);

        // Check if there are any results
        const userID = results.length > 0 ? results[0].user_id : null;

        console.log("Backend: userID from check email: ", userID);

        return res.json({ userID });
    });
};



exports.addUser = (req, res) => {
    const { firstName, lastName, email, admin} = req.body;
    console.log("POST Req: login with user -  ", req.body);
    // Validation: Check if the user already exists
    db.query('SELECT * FROM Users WHERE email = ?', [email], (selectErr, selectResults) => {
        console.log("query data from post request in add user");
        if (selectErr) {
            console.error(selectErr);
            return res.status(500).send('Error in checking for existing user');
        }

        if (selectResults.length > 0) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        //  new user includes first, last, email, and admin role
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            admin: admin
        };
        // Insert the new user into the database
        db.query('INSERT INTO Users SET ?', newUser, (insertErr, insertResults) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).send('Error in adding a new user');
            }
            // get the userID from result set header for Post request. 
            const userId = insertResults.insertId; 
            console.log("Return UserID from POST req: ", userId);

            // Include the user ID in the response
            return res.json({ message: 'User added successfully', user: { ...newUser, id: userId } });
        });
    });
};

exports.removeUser = (req, res) => {
    const { userID } = req.params; // Assuming you send userID as a route parameter
    console.log(`DELETE Req: remove user with ID - ${userID}`);

    db.query("DELETE FROM Users WHERE user_id = ?", [userID], (err, results) => {
        if (err) {
            res.status(500).send("Error in removing user from Users");
            return;
        }

        if (results.affectedRows === 0) {
            // No user found with the given ID
            res.status(404).json({ message: 'User not found with this ID' });
            return;
        }

        res.json({ message: 'User removed successfully' });
    });
};
