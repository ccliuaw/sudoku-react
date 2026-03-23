import React, { useContext, useEffect} from 'react';
import Board from '../components/Board';
import { SudokuContext } from '../context/SudokuContext';

export default function NormalGame() {
    const { startNormalGame, resetGame, board } = useContext(SudokuContext);

   // Generate puzzle only when mounting this page
   useEffect(() => {
       startNormalGame();
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

    return (
        <div className="game-page-container">
            <h2>Normal Game (9x9)</h2>
            <p className="timer-text">Time: <span>00:00</span></p>

            {board.length > 0 && <Board />}

            {/* 3. Attach onClick events and add CSS classes */}
            <div className="button-container">
                <button className="game-btn btn-new" onClick={startNormalGame}>
                    New Game
                </button>
                <button className="game-btn btn-reset" onClick={resetGame}>
                    Reset
                </button>
            </div>
        </div>
    );
}