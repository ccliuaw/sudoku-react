import React, { createContext, useState, useMemo } from 'react';
import { generateNormalBoard, generateEasyBoard } from '../utils/sudokuGenerator';

export const SudokuContext = createContext();

// Helper function to find all cells that violate Sudoku rules
function getConflictingCells(board) {
    const conflicts = new Set();
    const size = Math.sqrt(board.length); // Will be 9 or 6

    const boxRows = size === 6 ? 2 : 3;
    const boxCols = size === 6 ? 3 : 3;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) continue; // Skip empty cells

        const row = Math.floor(i / size);
        const col = i % size;
        const num = board[i];

        // Check the entire row
        for (let c = 0; c < size; c++) {
            if (c !== col && board[row * size + c] === num) {
                conflicts.add(i);
                conflicts.add(row * size + c);
            }
        }

        // Check the entire column
        for (let r = 0; r < size; r++) {
            if (r !== row && board[r * size + col] === num) {
                conflicts.add(i);
                conflicts.add(r * size + col);
            }
        }

        // Check the 3x3 or 2x3 sub-grid
        const startRow = Math.floor(row / boxRows) * boxRows;
        const startCol = Math.floor(col / boxCols) * boxCols;
        for (let r = 0; r < boxRows; r++) {
            for (let c = 0; c < boxCols; c++) {
                const checkRow = startRow + r;
                const checkCol = startCol + c;
                const checkIndex = checkRow * size + checkCol;

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
    const [board, setBoard] = useState([]);
    const [initialBoard, setInitialBoard] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);

    // add a gameId state to trigger timer resets
    const [gameId, setGameId] = useState(Date.now());

    const startNormalGame = () => {
        const newPuzzle = generateNormalBoard();
        setBoard(newPuzzle);
        setInitialBoard(newPuzzle);
        setSelectedCell(null);
        setGameId(Date.now());  // Update gameId to reset timer
    };

    const startEasyGame = () => {
        const newPuzzle = generateEasyBoard();
        setBoard(newPuzzle);
        setInitialBoard(newPuzzle);
        setSelectedCell(null);
        setGameId(Date.now());
    };

    // Reset the board to its initial state
    const resetGame = () => {
        setBoard([...initialBoard]);
        setSelectedCell(null);
        setGameId(Date.now());
    };

    const updateCell = (index, value) => {
        const newBoard = [...board];
        newBoard[index] = value;
        setBoard(newBoard);
    };

    // Calculate conflicts dynamically every time the board changes
    const conflicts = useMemo(() => getConflictingCells(board), [board]);

    // Check if the game is won
    const isGameWon = useMemo(() => {
        // 1. If the board hasn't loaded yet, return false
        if (board.length === 0) return false;
        
        // 2. Are there any empty cells (0) left?
        const isFull = !board.includes(0);
        
        // 3. Are there zero rule violations?
        const isCorrect = conflicts.length === 0;

        // The game is won if the board is full AND completely correct
        return isFull && isCorrect;
    }, [board, conflicts]);

    const value = {
        board,
        setBoard,
        initialBoard,
        selectedCell,
        setSelectedCell,
        updateCell,
        startNormalGame,
        startEasyGame,
        resetGame,
        conflicts, // Export conflicts so Cell components can read it
        isGameWon, // Export the winning state
        gameId // Export the gameId
    };

    return (
        <SudokuContext.Provider value={value}>
            {children}
        </SudokuContext.Provider>
    );
}