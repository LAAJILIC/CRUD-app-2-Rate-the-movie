import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setmovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then(
        (response) => { setmovieReviewList(response.data);
        });
  }, []);

  const handleSubmitReview = () => {
   Axios.post("http://localhost:5000/api/insert",{
     movieName: movieName,
     movieReview: review,
   });
   setmovieReviewList([...movieReviewList, { movieName: movieName, movieReview: review }, ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:5000/api/delete/${movie}`); 
  };

  const UpdateReview = (movie) => {
    Axios.put("http://localhost:5000/api/update", {
      movieName: movie,
      movieReview: newReview,
    }); 
    setNewReview("");
  };

  return (
    <div className="App">
    <form className='form'>
    <h1>Movie's Name</h1>
    <input type='text' 
    placeholder='Enter the name of the movie'
    className='form-input' 
    onChange={(e) => { setMovieName(e.target.value);}} />
    <h1>Movie's Review</h1>
    <input type='text' 
    placeholder='Write a review'
    className='form-input'
    onChange={(e) => { setReview(e.target.value);}} />
    <button className='form-button' onClick={handleSubmitReview}>Save the review</button>
      
    {movieReviewList.map((val, key) => {
       return (

        <div className='movie-description' key={key}>
        <h1>{val.movieName}</h1>
         <p>{val.movieReview}</p>
         <button onClick={() => {deleteReview(val.id)}} className='button'>Delete</button>
         <input type='text'
         placeholder='Update the review'
         onChange={(e) => {setNewReview(e.target.value)}}></input>
         <button className='button' onClick={() => {UpdateReview(val.movieName)}}>Update</button>
        </div>
         
       );
    })}
    </form> 
    </div>
  );
}

export default App;
