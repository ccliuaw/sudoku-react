import React, { useState, useEffect, useContext } from 'react';
import { SudokuContext } from '../context/SudokuContext';

export default function Timer() {
    // Bring in the states we need from Context
    const { isGameWon, gameId } = useContext(SudokuContext);
    const [seconds, setSeconds] = useState(0);

    // 1. Reset the timer to 0 whenever gameId changes (New Game / Reset)
    useEffect(() => {
        setSeconds(0);
    }, [gameId]);

    // 2. Handle the interval logic
    useEffect(() => {
        let interval = null;

        // If the game is NOT won, start counting
        if (!isGameWon) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else if (isGameWon && interval) {
            // If the game IS won, stop the timer
            clearInterval(interval);
        }

        // Cleanup function to prevent memory leaks
        return () => clearInterval(interval);
    }, [isGameWon, gameId]);

    // Helper function to format seconds into MM:SS
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    return (
        <p className="timer-text">
            Time: <span className="timer-numbers">{formatTime(seconds)}</span>
        </p>
    );
}
