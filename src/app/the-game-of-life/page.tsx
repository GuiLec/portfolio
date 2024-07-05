"use client";
import { useEffect, useState } from "react";

const SQUARE_SIZE = 20;
const GRID_SIZE = Math.ceil((window.innerWidth * 2) / SQUARE_SIZE);
const SPEED = 2;
const initialGrid = Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(false));
const MAX_ZOOM_LEVEL = 2;
const MIN_ZOOM_LEVEL = 0.3;

const TheGameOfLifePage = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const increaseZoom = () =>
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, MAX_ZOOM_LEVEL));
  const decreaseZoom = () =>
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, MIN_ZOOM_LEVEL));

  const [speed, setSpeed] = useState(SPEED);
  const increaseSpeed = () =>
    setSpeed((prevSpeed) => Math.min(prevSpeed * 2, 32));
  const decreaseSpeed = () =>
    setSpeed((prevSpeed) => Math.max(prevSpeed / 2, 0.5));

  const [grid, setGrid] = useState(initialGrid);

  const toggleSquare = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((col: number, cIndex: number) => {
          if (cIndex === colIndex) {
            return !col;
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

  const stopGame = () => {
    setHasGameStarted(false);
    setGrid(initialGrid);
  };

  const toggleGame = () => {
    if (hasGameStarted) {
      stopGame();
    } else {
      startGame();
    }
  };

  useEffect(() => {
    if (hasGameStarted) {
      const interval = setInterval(() => {
        advanceOneRound();
        if (!hasGameStarted) {
          clearInterval(interval);
        }
      }, 1000 / speed);
      return () => clearInterval(interval);
    }
  }, [hasGameStarted, advanceOneRound, speed]);

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
        <button onClick={toggleGame}>
          {hasGameStarted ? "Stop the game" : "Start the game"}
        </button>
      </section>
      <br />
      <div style={{ overflowX: "auto" }}>
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
                {row.map((col: number, colIndex: number) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => toggleSquare(rowIndex, colIndex)}
                    style={{
                      width: `${SQUARE_SIZE * zoomLevel}px`,
                      height: `${SQUARE_SIZE * zoomLevel}px`,
                      backgroundColor: col ? "black" : "white",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <div>Zoom: {zoomLevel.toFixed(1)}</div>
        <button style={{ padding: "10px" }} onClick={increaseZoom}>
          +
        </button>
        <button style={{ padding: "10px" }} onClick={decreaseZoom}>
          -
        </button>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <div>Speed: {speed.toFixed(1)}</div>
        <button style={{ padding: "10px" }} onClick={increaseSpeed}>
          +
        </button>
        <button style={{ padding: "10px" }} onClick={decreaseSpeed}>
          -
        </button>
      </div>
    </main>
  );
};

export default TheGameOfLifePage;
