import React, { useState } from 'react';
import { calculateWinner } from '../CalcWinner'
import Board from './Board' 


const styles = {
    width: '200px',
    margin: '20px auto'
}

const Game = () => {

    const [history, setHistory] = useState([Array(9).fill(null)]); //I created an empty array of 9 elements and fill it with 'null' because the board is empty in the beginning.(Later i wrapped it with an array because it's going to be an array of arrays. I'm going to have more than one board in this array, because i save the states and jump back and forth through them).
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXisNext] = useState(true);//We start with the X player
    const winner = calculateWinner(history[stepNumber]);//Gives back the most recent step

    const handleClick = i => { //first create a copy of the state
    const timeInHistory = history.slice(0, stepNumber + 1);//I slice out the history i don't need.
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    //If user clicks an occupied square or if game is won, return
    if (winner || squares[i]) return;
    //Put an X or an O in the clicked square   
    squares[i]  = xIsNext ? 'X': 'O'; //I mutated the board copy array with a new value
    setHistory([...timeInHistory, squares])//I have the time in history and I add another array with the most recent state(squares)
    setStepNumber(timeInHistory.length);//Gives us the new step number
    setXisNext(!xIsNext);//In order to return the opposite value
    }

    const jumpTo = (step) => {//jumps between the states
    setStepNumber(step);
    setXisNext( step % 2 === 0 )//if its 0 it sets it to true 
    }

    const renderMoves = () => (
        history.map((_step, move) => {//the _ because I don't use the steps
            const destination = move ? `Go to move${move}` : "Go to start"//renders so we jump back and forth in time
                return (
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>{destination}</button>
                    </li>
                )
        })
)
        return (
    <>
    <Board squares={history[stepNumber]} onClick={handleClick}/>
        <div styles={styles}>
        <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
        {renderMoves()}
        </div>
        </>   
    )
}

export default Game
