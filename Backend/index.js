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
        const {Email, Password, username,Age,Gender } = req.body;

        connection.query(
            'INSERT INTO Users (Email, Password, username,Age,Gender) VALUES (?, ?, ?,?,?)',
            [Email, Password, username,Age,Gender],
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

const loginUser = async (req, res) => {
    try {
        const {Email, Password } = req.query;
console.log(Email)
        connection.query(
            'SELECT * FROM Users where Email = ?',
            [Email],
            (err, result) => {
                if (err) {

                    console.error("Error adding user:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add to database",
                        error: err
                    });

                } else {
                    console.log('New user added:', result);

                    return res.status(200).json({
                        success: true,
                        data: result[0]?.Password === Password ? result[0] : null,
                        message: "User logged successfully"
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


app.get('/api/user/login', loginUser)

const createGenre = async (req, res) => {
    try {
        const { GenreName } = req.body;

        connection.query(
            'INSERT INTO Genre (GenreName) VALUES (?)',
            [GenreName],
            (err, result) => {
                if (err) {
                    console.error("Error adding genre:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add to database",
                        error: err
                    });
                } else {
                    console.log('New genre added:', result.insertId);

                    return res.status(200).json({
                        success: true,
                        data: result.insertId,
                        message: "Genre created successfully"
                    });
                }
            }
        );
    } catch (err) {
        console.error("Error adding genre:", err);

        return res.status(500).json({
            success: false,
            message: "Error adding genre",
            error: err
        });
    }
};

app.post('/api/genre/createGenre', createGenre);


const createBook = async (req, res) => {
    try {
        const { Title, Author, GenreID, PublishDate } = req.body;

        connection.query(
            'INSERT INTO Books (Title, Author, GenreID, PublishDate) VALUES (?, ?, ?, ?)',
            [Title, Author, GenreID, PublishDate],
            (err, result) => {
                if (err) {
                    console.error("Error adding book:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add to database",
                        error: err
                    });
                } else {
                    console.log('New book added:', result.insertId);

                    return res.status(200).json({
                        success: true,
                        data: result.insertId,
                        message: "Book created successfully"
                    });
                }
            }
        );
    } catch (err) {
        console.error("Error adding book:", err);

        return res.status(500).json({
            success: false,
            message: "Error adding book",
            error: err
        });
    }
};

app.post('/api/book/createBook', createBook);


const getUser = async (req, res) => {
    try {
      const { UserID } = req.query;
      connection.query('SELECT * FROM Users where UserID = ?', [UserID], (err, result) => {
        if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to fetch user from the database",
            error: err
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "User fetched successfully"
          });
        }
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: err
      });
    }
  };
  
  app.get("/api/user/getUser", getUser);



  const getAllBooks = (req, res) => {
    try {
        connection.query(`CREATE OR REPLACE VIEW BookInformation AS
        SELECT
            b.BookID,
            b.Title,
            b.Author,
            b.PublishDate,
            g.GenreName,
            AVG(r.Rating) AS AvgRating
        FROM
            Books b
        JOIN
            Genre g ON b.GenreID = g.GenreID
        LEFT JOIN
            Ratings r ON b.BookID = r.BookID
        GROUP BY
            b.BookID, b.Title, b.Author, b.PublishDate, g.GenreName;
         
        `, (err, result) => {
            if (err) {
                console.error("Error creating or replacing UserBookings view:", err);
                throw new ApiError(500, "Failed to create or replace UserBookings view");
            } else {
                // Once the view is created or replaced, select data from the view
                connection.query('SELECT * FROM BookInformation;', (err, result) => {
                    if (err) {
                        console.error("Error fetching :", err);
                        throw new ApiError(500, "Failed to fetch book info");
                    } else {
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: "User bookings fetched successfully"
                        });
                    }
                });
            }
        });
        
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching books",
        error: err
      });
    }
  };

  app.get("/api/books/allBooks",getAllBooks)


  const addOrUpdateRating = async (req, res) => {
    try {
      const { UserID, BookID, Rating } = req.body; // Assuming you send the data in the request body
  
      // Check if the user already has a rating for the book
      const existingRating = await new Promise((resolve, reject) => {
        connection.query(
          'SELECT * FROM Ratings WHERE UserID = ? AND BookID = ?',
          [UserID, BookID],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result[0]);
            }
          }
        );
      });
  
      if (existingRating) {
        // Update the existing rating
        connection.query(
          'UPDATE Ratings SET Rating = ? WHERE UserID = ? AND BookID = ?',
          [Rating, UserID, BookID],
          (err) => {
            if (err) {
              console.error('Error updating rating:', err);
              return res.status(500).json({
                success: false,
                message: 'Failed to update rating',
                error: err,
              });
            }
  
            return res.status(200).json({
              success: true,
              message: 'Rating updated successfully',
            });
          }
        );
      } else {
        // Insert a new rating
        connection.query(
          'INSERT INTO Ratings (UserID, BookID, Rating) VALUES (?, ?, ?)',
          [UserID, BookID, Rating],
          (err) => {
            if (err) {
              console.error('Error adding rating:', err);
              return res.status(500).json({
                success: false,
                message: 'Failed to add rating',
                error: err,
              });
            }
  
            return res.status(200).json({
              success: true,
              message: 'Rating added successfully',
            });
          }
        );
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error adding/updating rating',
        error: err,
      });
    }
  };
  
  app.post('/api/ratings/addOrUpdateRating', addOrUpdateRating);
  

  const addToAlreadyRead = async (req, res) => {
    try {
        const { UserID, BookID } = req.body; // Assuming the data is passed in the request body
        connection.query(
            'INSERT INTO AlreadyRead (UserID, BookID) VALUES (?, ?)',
            [UserID, BookID],
            (err, result) => {
                if (err) {
                    console.error("Error adding to AlreadyRead:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add to AlreadyRead",
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Added to AlreadyRead successfully"
                    });
                }
            }
        );
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error adding to AlreadyRead",
            error: err
        });
    }
};

app.post("/api/alreadyRead/add", addToAlreadyRead);
