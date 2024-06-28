"use client";
import { useEffect, useState } from "react";

const GRID_SIZE = 30; // Example grid size of 10x10
// Define the initial state for the grid
const initialGrid = Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(false)); // false for white, true for black

const SPEED = 2;

const TheGameOfLifePage = () => {
  const [grid, setGrid] = useState(initialGrid);

  // Function to toggle square color
  const toggleSquare = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((col: number, cIndex: number) => {
          if (cIndex === colIndex) {
            return !col; // Toggle the boolean value
          }
          return col;
        });
      }
      return row;
    });
    setGrid(newGrid);
  };

  const getNeighbors = (rowIndex: number, colIndex: number) => {
    let neighbors = 0;
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = colIndex - 1; j <= colIndex + 1; j++) {
        if (i >= 0 && i < GRID_SIZE && j >= 0 && j < GRID_SIZE) {
          if (i !== rowIndex || j !== colIndex) {
            if (grid[i][j]) {
              neighbors++;
            }
          }
        }
      }
    }
    return neighbors;
  };

  const advanceOneRound = () => {
    // For each square, check the number of live neighbors
    // If the square is alive and has 2 or 3 neighbors, it stays alive
    // If the square is dead and has 3 neighbors, it becomes alive
    // Otherwise, the square dies
    const newGrid = grid.map((row, rowIndex) =>
      row.map((col: number, colIndex: number) => {
        const neighbors = getNeighbors(rowIndex, colIndex);
        if (col) {
          return neighbors === 2 || neighbors === 3;
        } else {
          return neighbors === 3;
        }
      })
    );
    setGrid(newGrid);
  };
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const startGame = () => {
    setHasGameStarted(true);
  };

  useEffect(() => {
    if (hasGameStarted) {
      const interval = setInterval(() => {
        advanceOneRound();
      }, 1000 / SPEED);
      return () => clearInterval(interval);
    }
  }, [hasGameStarted, advanceOneRound]);

  return (
    <main>
      <h1>The Game of Life</h1>
      <br />
      <p>
        The Game of Life is a cellular automaton devised by the British
        mathematician John Horton Conway in 1970. It is a zero-player game,
        meaning that its evolution is determined by its initial state, requiring
        no further input. One interacts with the Game of Life by creating an
        initial configuration and observing how it evolves.
      </p>
      <br />
      <p>
        Rules: if a square has 2 or 3 neighbors, it stays alive; if a square has
        3 neighbors, it becomes alive; otherwise, it dies.
      </p>
      <br />
      <p>
        {
          "Click multiple squares to create an initial configuration, then click on 'Start the game' to see how it evolves."
        }
      </p>
      <br />
      <section>
        <button onClick={startGame}>Start the game</button>
      </section>
      <br />
      <section>
        <div
          style={{
            border: "1px solid black",
            display: "inline-flex",
            flexDirection: "column",
          }}
        >
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {/* This div wraps each row */}
              {row.map((col: number, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => toggleSquare(rowIndex, colIndex)}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: col ? "black" : "white",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TheGameOfLifePage;
