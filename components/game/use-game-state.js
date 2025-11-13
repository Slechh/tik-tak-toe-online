import { useState } from "react";
import { GAME_SYMBOLS } from "./constants";
import { getNextMove, computeWinner } from "./model";

export function useGameState(playersCount) {
  const [{ cells, currentMove }, setGameState] = useState(() => ({
    cells: new Array(19 * 19).fill(null),
    currentMove: GAME_SYMBOLS.CROSS,
  }));

  const handleCellClick = function (index) {
    setGameState((lastGameState) => {
      if (lastGameState.cells[index]) {
        return lastGameState;
      }
      return {
        ...lastGameState,
        currentMove: getNextMove(lastGameState.currentMove, playersCount),
        cells: lastGameState.cells.map((cell, i) =>
          i === index ? lastGameState.currentMove : cell,
        ),
      };
    });
  };

  const nextMove = getNextMove(currentMove, playersCount);
  const winnerSequence = computeWinner(cells);
  return {
    cells,
    currentMove,
    handleCellClick,
    nextMove,
    winnerSequence
  };
}
