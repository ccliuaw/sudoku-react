import React, { useContext } from 'react';
import Cell from './Cell';
import { SudokuContext } from '../context/SudokuContext';

export default function Board() {
    // Pull BOTH the current board and the initial board from Context
    const { board, initialBoard } = useContext(SudokuContext);

    return (
        <div className="sudoku-board-9x9">
            {board.map((num, index) => {
                // BUG FIX: Check the initialBoard, NOT the current num!
                const isFixed = initialBoard[index] > 0;
                
                return (
                    <Cell 
                        key={index} 
                        index={index} 
                        value={num === 0 ? '' : num} 
                        isFixed={isFixed} 
                    />
                );
            })}
        </div>
    );
}