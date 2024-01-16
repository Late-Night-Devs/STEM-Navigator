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

exports.addUser = (req, res) => {
    const { firstName, lastName, email } = req.body;
    console.log("POST Req: login with user -  ", req.body);
    // Validation: Check if both first and last names are empty
    if (!firstName && !lastName) {
        return res.status(400).json({ message: 'At least one of first or last names is required' });
    }

    // Validation: Check if the user already exists
    db.query('SELECT * FROM Users WHERE email = ?', [email], (selectErr, selectResults) => {
        if (selectErr) {
            console.error(selectErr);
            return res.status(500).send('Error in checking for existing user');
        }

        if (selectResults.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Assuming you have a Users table with columns: id, first_name, last_name, email
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            // STILL bug here: keep showing null value when testing with postman for BE and DB
            admin: 'FALSE'
        };

        // Insert the new user into the database
        db.query('INSERT INTO Users SET ?', newUser, (insertErr) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).send('Error in adding a new user');
            }
            return res.json({ message: 'User added successfully', user: newUser });
        });
    });
};

