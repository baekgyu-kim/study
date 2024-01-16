import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface IRating{
    Source : string;
    Value : string;
}
interface IMovieData {
    Title : string;
    Year : string;
    Rated : string;
    Released : string;
    Runtime : string;
    Genre : string;
    Director : string;
    Writer : string;
    Actors : string;
    Plot : string;
    Language : string;
    Country : string;
    Awards : string;
    Poster : string;
    Ratings : IRating[];
    Metascore : string;
    imdbRating : string;
    imdbVotes : string;
    imdbID : string;
    Type : string;
    DVD : string;
    BoxOffice : string;
    Production : string;
    Website : string;
    Response : string;
}

const ResultPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`;

const MovieName = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    `;

const DirectorActor = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    `;
const Poster = styled.img`
    width: 300px;
    height: 300px;
    margin-bottom: 1rem;
    `;
const Plot = styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    `;

function Search() {
    const { movieName } = useParams();
    const [movieData, setMovieData] = useState<IMovieData>();
    useEffect(() => {
        axios
            .get(`https://www.omdbapi.com/?t=${movieName}&apikey=dc035b58`)
            .then((response) => {
                setMovieData(response.data);});
    }, [movieName]);
    console.log(movieData);
    if (movieData?.Title === undefined) { 
        return (
            <ResultPage>
                <MovieName> Loading...</MovieName>
            </ResultPage>
        );
    } else {
        return (
            <ResultPage>
                <MovieName> {`${movieData.Title} (${movieData.Year} : ${movieData.Country})`}</MovieName>
                <DirectorActor> {`Director : ${movieData.Director}`}</DirectorActor>
                <DirectorActor> {`Actor : ${movieData.Actors}`}</DirectorActor>
                <Poster src={movieData.Poster} alt={`${movieData.Title} poster`} />
                <Plot> {movieData.Plot}</Plot>
            </ResultPage>
        );
    }


}
export default Search;
