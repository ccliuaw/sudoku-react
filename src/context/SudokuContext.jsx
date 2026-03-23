import React, { createContext, useState, useEffect, useMemo } from 'react';
import { generateNormalBoard } from '../utils/sudokuGenerator';

export const SudokuContext = createContext();

// Helper function to find all cells that violate Sudoku rules
function getConflictingCells(board) {
    const conflicts = new Set();
    
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) continue; // Skip empty cells
        
        const row = Math.floor(i / 9);
        const col = i % 9;
        const num = board[i];

        // Check the entire row
        for (let c = 0; c < 9; c++) {
            if (c !== col && board[row * 9 + c] === num) {
                conflicts.add(i);
                conflicts.add(row * 9 + c);
            }
        }

        // Check the entire column
        for (let r = 0; r < 9; r++) {
            if (r !== row && board[r * 9 + col] === num) {
                conflicts.add(i);
                conflicts.add(r * 9 + col);
            }
        }

        // Check the 3x3 sub-grid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const checkRow = startRow + r;
                const checkCol = startCol + c;
                const checkIndex = checkRow * 9 + checkCol;
                
                if (checkIndex !== i && board[checkIndex] === num) {
                    conflicts.add(i);
                    conflicts.add(checkIndex);
                }
            }
        }
    }
    
    return Array.from(conflicts); // Convert Set back to an array
}

export function SudokuProvider({ children }) {
    const [board, setBoard] = useState(Array(81).fill(0));
    const [initialBoard, setInitialBoard] = useState(Array(81).fill(0)); 
    const [selectedCell, setSelectedCell] = useState(null);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newPuzzle = generateNormalBoard();
        setBoard(newPuzzle);
        setInitialBoard(newPuzzle);
        setSelectedCell(null); 
    };

    // Reset the board to its initial state
    const resetGame = () => {
        setBoard([...initialBoard]);
        setSelectedCell(null);
    };

    const updateCell = (index, value) => {
        const newBoard = [...board];
        newBoard[index] = value;
        setBoard(newBoard);
    };

    // Calculate conflicts dynamically every time the board changes
    const conflicts = useMemo(() => getConflictingCells(board), [board]);

    const value = {
        board,
        setBoard,
        initialBoard,     
        setInitialBoard,
        selectedCell,
        setSelectedCell,
        updateCell,
        startNewGame,
        resetGame,
        conflicts // Export conflicts so Cell components can read it
    };

    return (
        <SudokuContext.Provider value={value}>
            {children}
        </SudokuContext.Provider>
    );
}