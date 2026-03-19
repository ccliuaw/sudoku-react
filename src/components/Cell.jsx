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
        
        if (inputValue === '' || /^[1-9]$/.test(inputValue)) {
            const newValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
            updateCell(index, newValue);
        }
    };

    // Dynamically build the class name based on the current state
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
            maxLength="1" 
            className={cellClassName} 
            value={value === 0 ? '' : value} 
            readOnly={isFixed}
            onClick={handleClick}
            onChange={handleChange}
        />
    );
}