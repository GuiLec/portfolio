"use client";
import LaunchDarklyProvider from "@/components/LaunchDarklyProvider/LaunchDarklyProvider";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";

const SPEED = 2;
const MAX_ZOOM_LEVEL = 2;
const MIN_ZOOM_LEVEL = 0.3;

export const TheGameOfLifeTemplate = ({
  initialGrid,
  squareSize,
  gridSize,
}: {
  initialGrid: boolean[][];
  squareSize: number;
  gridSize: number;
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const increaseZoom = () =>
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, MAX_ZOOM_LEVEL));
  const decreaseZoom = () =>
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, MIN_ZOOM_LEVEL));

  const [speed, setSpeed] = useState(SPEED);
  const increaseSpeed = () =>
    setSpeed((prevSpeed) => Math.min(prevSpeed * 2, 64));
  const decreaseSpeed = () =>
    setSpeed((prevSpeed) => Math.max(prevSpeed / 2, 0.5));

  const [grid, setGrid] = useState(initialGrid);

  const toggleSquare = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((col: boolean, cIndex: number) => {
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
        if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
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
      row.map((col: boolean, colIndex: number) => {
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
    window.dataLayer.push({
      event: "cta",
      name: "start-game-of-life",
    });
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
    <div>
      <section>
        <LaunchDarklyProvider>
          <StartTheGameButton
            hasGameStarted={hasGameStarted}
            onClick={toggleGame}
          />
        </LaunchDarklyProvider>
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
                {row.map((col: boolean, colIndex: number) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => toggleSquare(rowIndex, colIndex)}
                    style={{
                      width: `${squareSize * zoomLevel}px`,
                      height: `${squareSize * zoomLevel}px`,
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
    </div>
  );
};

const StartTheGameButton = ({
  onClick,
  hasGameStarted,
}: {
  onClick: () => void;
  hasGameStarted: boolean;
}) => {
  const { experimentGameOfLivePlayButtonLabelEnabled } = useFlags();

  const startGameLabel = experimentGameOfLivePlayButtonLabelEnabled
    ? "PLAY"
    : "Start the game";

  return (
    <button onClick={onClick}>
      {hasGameStarted ? "Stop the game" : startGameLabel}
    </button>
  );
};
