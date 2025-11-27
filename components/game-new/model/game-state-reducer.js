import { GAME_SYMBOLS, MOVE_ORDER } from "../constants";
import { getNextMove } from "./get-next-move";

export const GAME_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TICK: "tick",
};

export const initGameState = ({
  playersCount,
  defaultTimer,
  currentMoveStart,
}) => ({
  cells: new Array(19 * 19).fill(null),
  currentMove: GAME_SYMBOLS.CROSS,
  currentMoveStart,
  playersCount,
  timers: MOVE_ORDER.reduce((timers, symbol, index) => {
    if (index < playersCount) {
      timers[symbol] = defaultTimer;
    }
    return timers;
  }, {}),
});

export const gameStateReducer = (state, action) => {
  console.log("State:", state);
  console.log("Action:", action);
  switch (action.type) {
    case GAME_STATE_ACTIONS.CELL_CLICK: {
      const { index, now } = action;
      if (state.cells[index]) {
        return state;
      }
      // Если игрок походил то меняем данные, currentMoveStart мы меняем чтобы мы могли отследить за ходом следующего игрока
      return {
        ...state,
        timers: updateTimers(state, now),
        currentMove: getNextMove(state),
        currentMoveStart: now,
        cells: updateCell(state, index),
      };
    }
    case GAME_STATE_ACTIONS.TICK: {
      const { now } = action;
      if (!isTimeOver(state, now)) {
        return state;
      }
      return {
        ...state,
        timers: updateTimers(state, now),
        currentMove: getNextMove(state),
        currentMoveStart: now,
      };
    }
    default: {
      return state;
    }
  }
};

function updateTimers(gameState, now) {
  console.log("GameState: ",gameState.currentMoveStart);
  console.log("Now:", now)
  // Разница которую мы находим для того чтобы мы могли хранить в нашем масиве сколько осталось у игрока секунд на след ход

  const diff = now - gameState.currentMoveStart;
  console.log("Diff", diff);
  const timer = gameState.timers[gameState.currentMove];
  return {
    ...gameState.timers,
    [gameState.currentMove]: timer - diff,
  };
}

function updateCell(gameState, index) {
  return gameState.cells.map((cell, i) =>
    i === index ? gameState.currentMove : cell,
  );
}

function isTimeOver(gameState, now) {
  const timer = updateTimers(gameState, now)[gameState.currentMove]
  console.log("timer", timer)
  return timer <= 0;
}
