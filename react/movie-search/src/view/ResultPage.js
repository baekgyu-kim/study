import "../styles/ResultPage.css";

export const ResultPage = (movieData) => {
  const data = movieData.movieData;
  if (data.Title === undefined) {
    return (
      <div className="result-page">
        <h1> There is no such movie, please try again</h1>
        <button
          onClick={() => {
            window.location.replace("/");
          }}
        >
          {" "}
          Click to Research
        </button>
      </div>
    );
  } else {
    return (
      <div className="result-page">
        <div className="result-contents">
          <h1> {`${data.Title} ( ${data.Year} : ${data.Country})`} </h1>
          <hr></hr>
          <h3> director : {data.Director}</h3>
          <h3> actors : {data.Actors}</h3>
          <img src={data.Poster} alt={`${data.Title} poster`}></img>
          <p>{data.Plot}</p>
        </div>
        <hr></hr>
        <button
          onClick={() => {
            window.location.replace("/");
          }}
        >
          {" "}
          Click to Research
        </button>
      </div>
    );
  }
};
