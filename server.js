const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'DESKTOP-OU5JOCS',
    user: 'root',
    password: 'Poonam@123',
    database: 'remainder',
    connectionLimit: 10
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint to handle incoming data from the client
app.post('/addReminder', (req, res) => {
    const { Date, Discription, Subject_1, Email_Address, Contact_No, SMS_No, Remainder_name } = req.body;

    // Perform database query to insert data
    pool.query(
        'INSERT INTO ReminderTable (Date,Discription ,Subject_1 , Email_Address,Contact_No ,SMS_No , Remainder_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Date, Discription, Subject_1, Email_Address, Contact_No, SMS_No, Remainder_name],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            } else {
                console.log('Inserted into database');
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
