import { GameLayout } from "./ui/game-layout";
import { BackLink } from "./ui/back-link";
import { GameTitle } from "./ui/game-title";
import { GameInfo } from "./ui/game-info";
import { PlayerInfo } from "./ui/player-info";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameCell } from "./ui/game-cell";

import { useGameState } from "./model/use-game-state";

import { PLAYERS } from "./constants";
import { GameOverModal } from "./ui/game-over-modal";

const PLAYERS_COUNT = 4;

export function Game() {
  const {
    cells,
    nextMove,
    currentMove,
    winnerSequence,
    winnerSymbol,
    handleCellClick,
  } = useGameState(PLAYERS_COUNT);

  const winnerPlayer = PLAYERS.find(player => player.symbol === winnerSymbol)
  
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
            onClick={() => handleCellClick(index)}
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
