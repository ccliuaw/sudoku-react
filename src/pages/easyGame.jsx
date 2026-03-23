import React, { useContext, useEffect } from 'react';
import Board from '../components/Board';
import { SudokuContext } from '../context/SudokuContext';

export default function EasyGame() {
    const { startEasyGame, resetGame, board } = useContext(SudokuContext);

    // Generate puzzle only when mounting this page
    useEffect(() => {
        startEasyGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="game-page-container">
            <h2>Easy Game (6x6)</h2>
            <p className="timer-text">Time: <span>00:00</span></p>
            
            {board.length > 0 && <Board />}

            <div className="button-container">
                <button className="game-btn btn-new" onClick={startEasyGame}>New Game</button>
                <button className="game-btn btn-reset" onClick={resetGame}>Reset</button>
            </div>
        </div>
    );
}
