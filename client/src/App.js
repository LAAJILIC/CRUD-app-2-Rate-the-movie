import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setmovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then(
        (response) => { setmovieReviewList(response.data);
        });
  }, []);
  const handleSubmitReview = () => {
   Axios.post("http://localhost:5000/api/insert",{
     movieName: movieName,
     movieReview: review,
   }).then(() => {alert ("Well inserted");});
  };
  
  return (
    <div className="App">
      <form className='form'>
         <h1>Movie's Name</h1>
         <input type='text' 
         placeholder='Enter the name of the movie'
         className='form-input' 
         content-type='entity-body'
         onChange={(e) => {setMovieName(e.target.value);}} />
         <h1>Movie's Review</h1>
         <input type='text' 
         placeholder='Write a review'
         className='form-input'
         content-type='entity-body'
         onChange={(e) => {setReview(e.target.value);}} />
         <button className='form-button' onSubmit={handleSubmitReview}>Save the review</button>
          
         </form>
    </div>
  );
}

export default App;
