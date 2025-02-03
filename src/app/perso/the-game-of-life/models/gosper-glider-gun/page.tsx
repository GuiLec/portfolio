import { TheGameOfLifeTemplate } from "@/app/perso/the-game-of-life/components/TheGameOfLifeTemplate";

const SQUARE_SIZE = 20;
const GRID_SIZE = 100;
const initialSquares = [
  [2, 8],
  [2, 9],
  [3, 8],
  [3, 9],
  [12, 8],
  [12, 9],
  [12, 10],
  [13, 7],
  [13, 11],
  [14, 6],
  [14, 12],
  [15, 6],
  [15, 12],
  [16, 9],
  [17, 7],
  [17, 11],
  [18, 8],
  [18, 9],
  [18, 10],
  [19, 9],
  [22, 6],
  [22, 7],
  [22, 8],
  [23, 6],
  [23, 7],
  [23, 8],
  [24, 5],
  [24, 9],
  [26, 4],
  [26, 5],
  [26, 9],
  [26, 10],
  [36, 6],
  [36, 7],
  [37, 6],
  [37, 7],
];

const initialGrid: boolean[][] = Array.from({ length: GRID_SIZE }, () =>
  Array.from({ length: GRID_SIZE }, () => false)
);

initialSquares.forEach(([row, col]) => {
  if (row < GRID_SIZE && col < GRID_SIZE) {
    initialGrid[row][col] = true;
  }
});

const GosperGliderGunPage = () => {
  return (
    <main>
      <h1>Gosper glider gun</h1>
      <br />
      <TheGameOfLifeTemplate
        initialGrid={initialGrid}
        squareSize={SQUARE_SIZE}
        gridSize={GRID_SIZE}
      />
    </main>
  );
};

export default GosperGliderGunPage;
