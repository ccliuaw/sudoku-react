import React from 'react';
import Board from '../components/Board';

export default function NormalGame() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Normal Game (9x9)</h2>
            <p>Time: <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>00:00</span></p>

            {/* Call the board component we just created */}
            <Board />

            <div style={{ marginTop: '20px', gap: '10px', display: 'flex', justifyContent: 'center' }}>
                <button>New Game</button>
                <button>Reset</button>
            </div>
        </div>
    );
}