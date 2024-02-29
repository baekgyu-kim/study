import "../styles/SearchPage.css";

import { useState } from "react";
import axios from "axios";

import { SearchBar } from "../components/SearchBar";

export const SearchPage = ({ movieData, setMovieData }) => {
  const [movieName, setMovieName] = useState("");

  const handleSearchButtonClick = (movieName) => {
    axios
      .get(`https://www.omdbapi.com/?t=${movieName}&apikey=dc035b58`)
      .then((res) => {
        setMovieData(res.data);
      });
  };

  return (
    <div className="search-page">
      <h1>Search Movie</h1>
      <SearchBar
        movieName={movieName}
        setMovieName={setMovieName}
        handleSearchButtonClick={handleSearchButtonClick}
      />
      <hr></hr>
    </div>
  );
};
