# Sudoku Master

A fully functional, responsive, and dynamic Sudoku web application built with React. This project implements advanced board generation algorithms, real-time input validation, and modern web application features to provide a seamless puzzle-solving experience.

Start playing: https://sudoku-react-5mf4.onrender.com/

## Core Features

* **Dynamic Puzzle Generation:** Boards are not hardcoded. Every time a user starts a new game, a brand-new valid puzzle is randomly generated.
* **Multiple Difficulties:**
    * **Normal Mode (9x9):** Generates a classic 9x9 board with approximately 30 pre-filled clues, ensuring the puzzle has exactly ONE unique solution.
    * **Easy Mode (6x6):** Generates a 6x6 board with 2x3 sub-grids and exactly 18 pre-filled clues.
* **Real-Time Validation:** Inputting a number that violates Sudoku rules (row, column, or sub-grid conflicts) instantly highlights the conflicting cells with a red border and background.
* **Smart Timer:** Tracks the player's solving time. The timer automatically pauses when the game is won and resets upon starting a new game.
* **Win Condition & Lockdown:** Once the board is completely and correctly filled, the game locks all inputs and displays a congratulatory message.
* **Static Pages:** Includes carefully designed, responsive pages for Home, Rules, Selection, Login, Register, and High Scores, completely free of inline CSS.

## Bonus Points Claimed

### 1. Backtracking Algorithm
To guarantee the quality of the puzzles, the application uses a custom Backtracking algorithm (`src/utils/sudokuGenerator.js`). 
* **Generation:** It first completely fills an empty grid by recursively trying random numbers (1-9) while validating constraints, backtracking when it hits a dead end.
* **Unique Solution Verification:** When removing numbers to create the puzzle, the algorithm runs a solver function to count the number of valid solutions. If removing a specific number creates multiple possible solutions, it places the number back, ensuring the final puzzle is 100% uniquely solvable.

### 2. LocalStorage Progress Saving
The application utilizes browser `localStorage` to save the user's progress automatically.
* If a user accidentally refreshes the page or closes the browser, their current board layout, inputted numbers, and exact timer seconds are preserved.
* Clicking the "New Game" button clears the local storage and fetches a fresh puzzle.

## Tech Stack & Architecture

* **Frontend Framework:** React (using Context API for global state management)
* **Routing:** React Router DOM (for seamless Single Page Application navigation)
* **Styling:** Pure CSS with a mobile-first responsive design approach. All CSS is modularly organized in `App.css` with zero inline styles.

## Project Structure

```text
src/
├── components/
│   ├── Board.jsx      # Renders the Sudoku grid dynamically
│   ├── Cell.jsx       # Individual input cell with validation logic
│   ├── Timer.jsx      # Independent timer component 
├── context/
│   └── SudokuContext.jsx # Global state (board, conflicts, win state, save logic)
├── pages/
│   ├── Home.jsx, Rules.jsx, Selection.jsx ... # Static and routing pages
│   ├── NormalGame.jsx # 9x9 Game container
│   └── EasyGame.jsx   # 6x6 Game container
├── utils/
│   └── sudokuGenerator.js # Core logic for generating boards via backtracking
└── App.js & App.css   # Main entry point and global styles