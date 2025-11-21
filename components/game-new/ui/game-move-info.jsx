import { GameSymbol } from "./game-symbol";

export function GameMoveInfo({ actions, currentMove, nextMove }) {
  return (
    <>
      <div className="flex gap-1 items-center font-semibold text-xl leading-tight">
        Ход: <GameSymbol symbol={currentMove} className="w-5 h-5" />
      </div>
      <div className="flex gap-1 items-center text-slate-400 text-xs leading-tight">
        Следующий: <GameSymbol symbol={nextMove} className="w-3 h-3" />
      </div>
    </>
  );
}
