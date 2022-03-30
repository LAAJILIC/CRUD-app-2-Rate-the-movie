const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cycy1994*moha',
    database: 'cruddb',
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
        
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) { res.send(err);}
        else { 
            console.log(result); }
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const name = req.params.id;

    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) res.send(err);
    });
});

app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) res.send(err);
    });
});
//   app.get("/", (req,res) => {
//      const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Lost', 'awesome');";
//       db.query(sqlInsert, (err, result) => {
//           res.send("Hello Cyrine");
//       })
//     });

app.listen(5000, () => { 
    // if (error) throw error;
    console.log('Server running on port 5000'); 
});