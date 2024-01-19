import { useEffect, useState } from "react";
import HeadTitle from "../components/HeadTitle"
import Link from "next/link";

interface IMovie { 
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview:string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average:number;
    vote_count: number;

}

const Home = () => { 
    const [movies, setMovies] = useState<IMovie[]>();
    useEffect(() => {
        (
            async () => { 
                const response = await fetch("api/movies");
                const movieJson = await response.json();
                const movieResult = await movieJson.results;
                setMovies(movieResult);
            }
        )();
    }, []);
    return (
        <div className="home">
            <HeadTitle title="Home" />
            {movies === undefined ? (
                <h1>Loading...</h1>
            ) : (
                <div className="home__movie-list__container">
                    {movies.map((movie) => (
                        <Link key={movie.id} href={`/movies/${movie.id}`}>
                            
                                <div className="home__movie-list__element">
                                    <h3>{movie.original_title}</h3>
                                    <img
                                        className="home__movie-list__element__img"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.original_title}
                                    />
                                    <p>{movie.overview}</p>
                                </div>
                            
                        </Link>
                    ))}
                </div>
            )}

            <style jsx>{`
                .home {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .home__movie-list__container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .home__movie-list__element {
                    width: 300px;
                    margin: 10px;
                    padding: 10px;
                    border: 1px solid black;
                    border-radius: 5px;
                }
                .home__movie-list__element__img {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                }
            `}</style>
        </div>
    );
}
export default Home;