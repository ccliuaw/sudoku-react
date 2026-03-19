import React, { useContext } from 'react';
import { SudokuContext } from '../context/SudokuContext';

export default function Cell({ value, isFixed, index }) {
    const { selectedCell, setSelectedCell, updateCell } = useContext(SudokuContext);

    const isSelected = selectedCell === index;

    const handleClick = () => {
        setSelectedCell(index);
    };

    const handleChange = (e) => {
        if (isFixed) return;

        const inputValue = e.target.value;
        
        // 1. Handle deletion (Backspace)
        if (inputValue === '') {
            updateCell(index, 0);
            return;
        }

        // 2. Always grab the very last character typed
        const lastChar = inputValue.slice(-1);
        
        // 3. Check if that last character is a valid number
        if (/^[1-9]$/.test(lastChar)) {
            updateCell(index, parseInt(lastChar, 10));
        }
    };

    let cellClassName = "cell";
    if (isFixed) {
        cellClassName += " fixed";
    }
    if (isSelected) {
        cellClassName += " selected";
    }

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