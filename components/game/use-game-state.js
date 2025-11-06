import { useState } from "react";
import { GAME_SYMBOLS, MOVE_ORDER } from "./constants";

const getNextMove = function (currMove) {
  const nextMoveIndex = MOVE_ORDER.indexOf(currMove) + 1;
  return MOVE_ORDER[nextMoveIndex] ?? MOVE_ORDER[0];
};

export function useGameState() {
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
        currentMove: getNextMove(lastGameState.currentMove),
        cells: lastGameState.cells.map((cell, i) =>
          i === index ? lastGameState.currentMove : cell,
        ),
      };
    });
  };

  const nextMove = getNextMove(currentMove);
  return {
    cells,
    currentMove,
    handleCellClick,
    nextMove,
  };
}
