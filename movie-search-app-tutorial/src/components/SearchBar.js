import "../styles/SearchBar.css";

export const SearchBar = ({
  movieName,
  setMovieName,
  handleSearchButtonClick,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Please enter movie name you want to search"
        onChange={(e) => setMovieName(e.target.value)}
      ></input>
      <button onClick={() => handleSearchButtonClick(movieName)}>Search</button>
    </div>
  );
};
