import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HomePage = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5rem;
    `;
const BackgroundImageContainer = styled.div`
        width: 100wh;
        height: 100vh;
    `;

const BackgroundImage = styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

function Home() { 
    const demoMovieNameList = [
        "Harry Potter",
        "Avengers",
        "Avatar",
        "Matrix",
        "Inception",
        "Interstellar",
        "The Dark Knight",
        "The Lord of the Rings",
        "The Shawshank Redemption",
        "The Godfather",
        "The Godfather: Part II",
        "The Dark Knight Rises",
        "The Matrix",
        "The Matrix Reloaded",
        "The Matrix Revolutions",
        "The Lord of the Rings: The Fellowship of the Ring",
        "The Lord of the Rings: The Two Towers",
        "The Lord of the Rings: The Return of the King",
        "Inception",
        "Interstellar",
        "Dunkirk",
        "The Prestige",
        "Memento",
        "Tenet",
        "Batman Begins",
        "The Dark Knight",
        "The Dark Knight Rises",
        "The Shawshank Redemption",
        "The Godfather",
        "The Godfather: Part II",
        "The Godfather: Part III",
        "The Green Mile",
        "Forrest Gump",
        "The Terminal",
        "Cast Away",
        "Catch Me If You Can",
        "Saving Private Ryan",
        "The Da Vinci Code",
        "Angels & Demons",
        "Inferno",
        "The Dark Knight",
        "The Dark Knight Rises",
        "The Prestige",
        "Memento",
        "Tenet",
        "Interstellar",
        "Inception",
        "Dunkirk",
        "The Dark Knight",
        "The Dark Knight Rises",
        "The Prestige",
        "Memento",
        "Tenet",
        "Interstellar",
        "Inception",
        "Dunkirk",
        "The Dark Knight"];
    const demoMovieNameListLength = demoMovieNameList.length;
    const randomNum = Math.ceil(Math.random() * 100) % demoMovieNameListLength;
    const [movieImage, setMovieImage] = useState("");
    useEffect(() => {
        axios
            .get(`https://www.omdbapi.com/?t=${demoMovieNameList[randomNum]}&apikey=dc035b58`)
            .then((response) => {
                setMovieImage(response.data.Poster);});
    }, []);

    return (
        <HomePage>
            <BackgroundImageContainer>
                <BackgroundImage src={movieImage} alt="movie poster" />
            </BackgroundImageContainer>
        </HomePage>
    );
}
export default Home;