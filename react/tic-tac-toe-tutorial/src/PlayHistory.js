import { useState } from 'react';
import "./styles/PlayHistory.css"

export const PlayHistory = ({squaresHistory, jump}) => {
    const slicedSquaresHistory = squaresHistory.slice(0, squaresHistory.length - 1)
    const moves = slicedSquaresHistory.map((squares, i) => {
        let description = ""
        if(i > 0){
            description = `Go to move ${i}`;
        }else{
            description = "Go to initial state";
        }
        return(
            <li key = {i}>
                <button className = "play-history-ul-button" onClick={() => jump(i)}>{description}</button>
            </li>
        )
    })
    if(slicedSquaresHistory.length === 0){
        return null;
    }else{
        return(
            <div className = "play-history">
                <h3>Play History</h3>
                <ul className = "play-history-ul">{moves}</ul>
            </div>
        )
    }
}

