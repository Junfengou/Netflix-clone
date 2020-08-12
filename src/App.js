import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      {/* Nav */}
      <Nav />

      {/* Banner */}
      <Banner />

      {/*A component which contains a props called title and passing in a value for the props */}
      <Row title="Trending Now" fetchURL={requests.fetchTrending} isLargeRow />
      {/*or isLargeRow={true} */}
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance" fetchURL={requests.fetchRomanceMovies} />
    </div>
  );
}

export default App;
