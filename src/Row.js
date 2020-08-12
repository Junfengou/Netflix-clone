import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

//This props gets pass down here
function Row({ title, fetchURL, isLargeRow }) {
  //State is a good place to write variable in React'
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    //width: "100%",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //A snippet of code which runs based on a specific condition
  useEffect(() => {
    //async function is a promised based library that helps fetch data
    async function fetchData() {
      //When you make this request, wait for the promise to come back
      const request = await axios.get(fetchURL);
      // axios = https://api.themoviedb.org/3
      // fetchUrl = /trending/all/week?api_key=${API_KEY}&language=en-US
      //https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US

      console.log("Return this request", request.data.results); //look at the data structure on what gets return back
      //A good way to look for the data that's fetching from the api is to console log it
      // and look for the data being returned in the result tab
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    //If the bracket is blank, run once when the row loads, but don't run it again
  }, [fetchURL]); //Any data being pull from outside into the useEffect[in this case is fetchURL] it need to be inserted in here
  //Anytime the [fetchURL] changes, it will update the useEffect

  console.log("movie list:", movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/*row posters */}
        {/* movie.poster_path is the jpg, not an actual link*/}
        {movies.map((movie) => (
          <img
            key={movie.id} //This will slightly optimize the loading of large list
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`} //Different stlying purpose
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} //If the movie is (isLargeRow) use movie.poster_path
            //Otherwise use movie.backdrop_path
            alt={movie.name}
          />
        ))}
      </div>
      {/* title */}
      {/*Now state the props and it will print out whatever is passed in here*/}
      {/* container -> posters */}
      {/**<Youtube videoId={trailerUrl} opts={opts} />*/}
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
