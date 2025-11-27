import { useReducer } from "react";

import { GameLayout } from "./ui/game-layout";
import { BackLink } from "./ui/back-link";
import { GameTitle } from "./ui/game-title";
import { GameInfo } from "./ui/game-info";
import { PlayerInfo } from "./ui/player-info";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameCell } from "./ui/game-cell";
import { GameOverModal } from "./ui/game-over-modal";

import { GAME_STATE_ACTIONS } from "./model/game-state-reducer";
import { initGameState } from "./model/game-state-reducer";
import { gameStateReducer } from "./model/game-state-reducer";
import { getNextMove } from "./model/get-next-move";
import { computeWinner } from "./model/compute-winner";
import { computeWinnerSymbol } from "./model/compute-winner-symbol";
import { computerPlayerTimer } from "./model/compute-player-timer";

import { PLAYERS } from "./constants";

import { useInterval } from "../lib/timers";

const PLAYERS_COUNT = 2;

export function Game() {
  const [gameState, dispatch] = useReducer(gameStateReducer, undefined, () =>
    initGameState({
      playersCount: PLAYERS_COUNT,
      defaultTimer: 10000,
      currentMoveStart: Date.now(), // Когда начался ход первого игрока(запускается один раз в самом начале)
    }),
  );

  // Вызывается при каждом ререндере Game, но поскольку у нас внутри самой функции есть useEffect который запускает setInterval для нашего игрока, который будет работать до того момента пока у нас не изменится gameState.currentMoveStart(то есть не поменяется игрок)
  useInterval(1000, gameState.currentMoveStart, () => { 
    dispatch({ type: GAME_STATE_ACTIONS.TICK , now: Date.now()});
  });

  const winnerSequence = computeWinner(gameState);
  const nextMove = getNextMove(gameState);
  const winnerSymbol = computeWinnerSymbol(gameState, {
    winnerSequence,
    nextMove,
  });

  const winnerPlayer = PLAYERS.find((player) => player.symbol === winnerSymbol);

  const { cells, currentMove } = gameState;

  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        gameTitle={<GameTitle />}
        gameInfo={
          <GameInfo isRatingGame playersCount={4} timeMode={"1 мин. на ход"} />
        }
        playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => {
          // timer - просто колво секунд текущего игрока
          // timerStartAt - это то время когда текущий игрок начала ходить 
          const { timer , timerStartAt } = computerPlayerTimer(
            gameState,
            player.symbol,
          );
          return (
            <PlayerInfo
              key={player.id}
              avatar={player.avatar}
              name={player.name}
              rating={player.rating}
              symbol={player.symbol}
              isRight={index % 2 === 1}
              timer={timer}
              timerStartAt={timerStartAt}
            />
          );
        })}
        gameMoveInfo={
          <GameMoveInfo nextMove={nextMove} currentMove={currentMove} />
        }
        gameCells={cells.map((cell, index) => (
          <GameCell
            disabled={!!winnerSymbol}
            onClick={() => {
              dispatch({
                type: GAME_STATE_ACTIONS.CELL_CLICK,
                index,
                now: Date.now(),
              });
            }}
            key={index}
            isWinner={winnerSequence?.includes(index)}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        players={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
          <PlayerInfo
            key={player.id}
            avatar={player.avatar}
            name={player.name}
            rating={player.rating}
            symbol={player.symbol}
            isRight={index % 2 === 1}
            timer={gameState.timers[player.symbol]}
          />
        ))}
        winnerName={winnerPlayer?.name}
      />
    </>
  );
}
