import React, { createContext, useState } from 'react';

export const SudokuContext = createContext();

export function SudokuProvider({ children }) {
    // Temporary mock data until we build the random generation logic
    const mockBoardData = [
        5, 3, 0, 0, 7, 0, 0, 0, 0,
        6, 0, 0, 1, 9, 5, 0, 0, 0,
        0, 9, 8, 0, 0, 0, 0, 6, 0
    ];
    // Fill the rest with 0s to make it 81 cells
    const startingPuzzle = [...mockBoardData, ...Array(81 - mockBoardData.length).fill(0)];

    // 1. The current state of the board (changes when user types)
    const [board, setBoard] = useState(startingPuzzle);
    
    // 2. The original puzzle (never changes during gameplay)
    const [initialBoard, setInitialBoard] = useState(startingPuzzle); 
    
    const [selectedCell, setSelectedCell] = useState(null);

    const updateCell = (index, value) => {
        const newBoard = [...board];
        newBoard[index] = value;
        setBoard(newBoard);
    };

    const value = {
        board,
        setBoard,
        initialBoard,     // Expose the original puzzle
        setInitialBoard,
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