"use client";
import { useState } from "react";

const GRID_SIZE = 200; // Example grid size of 10x10

const TheGameOfLifePage = () => {
  // Define the initial state for the grid
  const initialGrid = Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(false)); // false for white, true for black

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

  return (
    <main>
      <h1>The Game of Life</h1>
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
    </main>
  );
};

export default TheGameOfLifePage;
