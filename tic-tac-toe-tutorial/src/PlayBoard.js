import { Square } from './Square';
import { useState } from 'react';
import { calculateWinner } from './utils/calculateWinner';

import './styles/PlayBoard.css';

export const PlayBoard = ({squares, seq, winner, setWinner, updateSquaresHistory}) => {

    const handleSquareClick = (i, seq) => {
        let currentWinner = calculateWinner(squares);
        if(currentWinner !== null){
            return;
        }
        if (squares[i] !== null) {
            return;
        }
        const clickResultSquares = squares.slice();
        if(seq % 2 === 0){
            clickResultSquares[i] = "X";
        }else{
            clickResultSquares[i] = "O";
        }
        currentWinner = calculateWinner(clickResultSquares);
        if(currentWinner !== null){
            setWinner(currentWinner);
            return;
        }
        if(currentWinner === null && seq === 8){
            setWinner("draw");
            return;
        }
        updateSquaresHistory(clickResultSquares);
    }

    if(winner === null){
        return(
            <div className = "play-board">
                {[[0,1,2], [3,4,5], [6,7,8]].map((list, i) => {
                return(
                    <div key = {i} className="board-row">
                        {
                        list.map((n, i) => {
                            return(
                                < Square key = {i} value = {squares[n]} onSquareClick = {() => {handleSquareClick(n, seq)}}/>
                            )
                        })
                        }
                    </div>
                )
                })}
            </div>
        )
    }else{
        return(
            <div className = "game-result">
                {
                    winner === "draw"
                    ? (<h1 className = "game-result-message"> Draw !!! </h1>)
                    :(<h1 className = "game-result-message"> The Winner is {winner} !!! </h1>)
                }
                <button className = "regame-button" onClick = {() => {location.reload(); return;}}> Regame </button>
            </div>
        )
    }
}