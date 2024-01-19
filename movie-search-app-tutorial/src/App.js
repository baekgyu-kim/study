import "./styles/App.css";

import { Nav } from "./components/Nav";
import { SearchPage } from "./view/SearchPage";
import { ResultPage } from "./view/ResultPage";
import { useState } from "react";

function App() {
  const [movieData, setMovieData] = useState(null);

  return (
    <div className="App">
      <Nav />
      {movieData === null ? (
        <SearchPage movieData={movieData} setMovieData={setMovieData} />
      ) : (
        <ResultPage movieData={movieData} />
      )}
    </div>
  );
}

export default App;
