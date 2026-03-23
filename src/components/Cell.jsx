import React, { useContext } from 'react';
import { SudokuContext } from '../context/SudokuContext';

export default function Cell({ value, isFixed, index }) {
    // Bring in conflicts from Context
    const { selectedCell, setSelectedCell, updateCell, conflicts } = useContext(SudokuContext);

    const isSelected = selectedCell === index;
    
    // Check if this specific cell index is in the conflicts array
    const isIncorrect = conflicts.includes(index);

    // Calculate row and column (0-indexed)
    const row = Math.floor(index / 9);
    const col = index % 9;

    const handleClick = () => {
        setSelectedCell(index);
    };

    const handleChange = (e) => {
        if (isFixed) return;

        const inputValue = e.target.value;
        
        if (inputValue === '') {
            updateCell(index, 0);
            return;
        }

        const lastChar = inputValue.slice(-1);
        
        if (/^[1-9]$/.test(lastChar)) {
            updateCell(index, parseInt(lastChar, 10));
        }
    };

    // Add the "incorrect" class if there's a rule violation
    let cellClassName = "cell";
    if (isFixed) cellClassName += " fixed";
    if (isSelected) cellClassName += " selected";
    if (isIncorrect) cellClassName += " incorrect";

    // Add classes for 3x3 grid borders
    if (col === 2 || col === 5) cellClassName += " border-right-thick";
    if (row === 2 || row === 5) cellClassName += " border-bottom-thick";

    return (
        <input 
            type="text"
            className={cellClassName} 
            value={value === 0 ? '' : value} 
            readOnly={isFixed}
            onClick={handleClick}
            onChange={handleChange}
        />
    );
}