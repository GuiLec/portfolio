import { TheGameOfLifeTemplate } from "@/app/the-game-of-life/components/TheGameOfLifeTemplate";

const SQUARE_SIZE = 20;
const GRID_SIZE = 100;

const initialGrid = Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(false));

const TheGameOfLifePage = () => {
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
        <a href="/the-game-of-life/models/gosper-glider-gun">
          Gosper glider gun
        </a>
      </p>
      <br />
      <p>
        {
          "Click multiple squares to create an initial configuration, then click on 'Start the game' to see how it evolves."
        }
      </p>
      <br />
      <TheGameOfLifeTemplate
        initialGrid={initialGrid}
        squareSize={SQUARE_SIZE}
        gridSize={GRID_SIZE}
      />
    </main>
  );
};

export default TheGameOfLifePage;
