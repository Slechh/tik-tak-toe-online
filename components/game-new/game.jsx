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

import { PLAYERS } from "./constants";

const PLAYERS_COUNT = 4;

export function Game() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    { playersCount: PLAYERS_COUNT },
    initGameState,
  );
  
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
        playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
          <PlayerInfo
            key={player.id}
            avatar={player.avatar}
            name={player.name}
            rating={player.rating}
            symbol={player.symbol}
            isRight={index % 2 === 1}
            seconds={60}
          />
        ))}
        gameMoveInfo={
          <GameMoveInfo nextMove={nextMove} currentMove={currentMove} />
        }
        gameCells={cells.map((cell, index) => (
          <GameCell
            disabled={!!winnerSymbol}
            onClick={() => {
              dispatch({ type: GAME_STATE_ACTIONS.CELL_CLICK, index });
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
            seconds={60}
          />
        ))}
        winnerName={winnerPlayer?.name}
      />
    </>
  );
}
