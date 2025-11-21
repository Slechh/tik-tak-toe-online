import { MOVE_ORDER } from "../constants";

export const getNextMove = function (currMove, playersCount, playersTimeOver) {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount).filter(
    (symbol) => !playersTimeOver.includes(symbol),
  );

  const nextMoveIndex = slicedMoveOrder.indexOf(currMove) + 1;
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
};
