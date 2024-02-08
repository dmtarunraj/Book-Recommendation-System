import express from "express";
import mysql from 'mysql2';
import cors from "cors"
const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors({origin:"*"}))
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tarunraj@2003",
    database: "dbproject"
});

connection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to MySQL database!');

});



const createUser = async (req, res) => {
    try {
        const {Email, password, username,Age,Gender } = req.body;

        connection.query(
            'INSERT INTO Users (Email, password, username,Age,Gender) VALUES (?, ?, ?,?,?)',
            [Email, password, username,Age,Gender],
            (err, result) => {
                if (err) {

                    console.error("Error adding user:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add to database",
                        error: err
                    });

                } else {
                    console.log('New user added:', result.insertId);

                    return res.status(200).json({
                        success: true,
                        data: result.insertId,
                        message: "User created successfully"
                    });
                }
            }
        );
    } catch (err) {
        console.error("Error adding user:", err);

        return res.status(500).json({
            success: false,
            message: "Error adding user",
            error: err
        });
    }
};

app.post('/api/user/createUser', createUser)