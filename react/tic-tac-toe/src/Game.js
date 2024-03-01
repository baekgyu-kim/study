import { useState } from 'react';
import { PlayBoard } from './PlayBoard';
import { PlayHistory } from './PlayHistory';
import "./styles/Game.css"


export const Game = () => {
    const [seq, setSeq] = useState(0);
    const [winner, setWinner] = useState(null);
    
    const [squaresHistory, setsquaresHistory] = useState([Array(9).fill(null)]);
    const currentSquares = squaresHistory[seq];

    const updateSquaresHistory = (currentSquares) => {
        const updatedSquaresHistory = [...squaresHistory.slice(0, seq + 1), currentSquares];
        setsquaresHistory(updatedSquaresHistory);
        setSeq(updatedSquaresHistory.length - 1);
    }

    const jump = (jumpSeq) => {
        setSeq(jumpSeq);
        setWinner(null);
    }

    return (
        <div className="App">
            <div className="game">
                <PlayBoard squares = {currentSquares} seq = {seq} winner = {winner} setWinner = {setWinner} updateSquaresHistory = {updateSquaresHistory}/>
                < PlayHistory squaresHistory = {squaresHistory} jump = {jump}/>
            </div>
        </div>
    )
}