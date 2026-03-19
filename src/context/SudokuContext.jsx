import React, { createContext, useState } from 'react';

export const SudokuContext = createContext();

export function SudokuProvider({ children }) {
    // state 1: generate a empty 9x9 board (81 cells) with 0 representing empty cells
    const [board, setBoard] = useState(Array(81).fill(0));

    // state 2: currently selected cell (index 0~80)
    const [selectedCell, setSelectedCell] = useState(null);

    // a helper function to update a specific cell's number
    const updateCell = (index, value) => {
        const newBoard = [...board];
        newBoard[index] = value;
        setBoard(newBoard);
    };

    // a helper function to reset the board to its initial state
    const value = {
        board,
        setBoard,
        selectedCell,
        setSelectedCell,
        updateCell
    };

    return (
        <SudokuContext.Provider value={value}>
            {children}
        </SudokuContext.Provider>
    );
}