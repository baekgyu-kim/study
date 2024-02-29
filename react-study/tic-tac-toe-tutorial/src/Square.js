import React, { useState } from 'react';
import "./styles/Square.css"

export const Square = ({value, onSquareClick}) => {

    return(
        <button className = "square" onClick = {onSquareClick} >{value}</button>
    )
}