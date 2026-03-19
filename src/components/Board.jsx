import React, { useContext } from 'react';
import Cell from './Cell';
import { SudokuContext } from '../context/SudokuContext';

export default function Board() {
    // get the board state from context
    const { board } = useContext(SudokuContext);

    return (
        <div className="sudoku-board-9x9" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(9, 40px)', 
            gap: '2px',
            justifyContent: 'center',
            margin: '20px'
        }}>
            {board.map((num, index) => {
                const isFixed = num > 0;
                
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