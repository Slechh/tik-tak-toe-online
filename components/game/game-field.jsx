import clsx from "clsx";
import { UiButton } from "../uikit/ui-button";
import { GameSymbol } from "./game-symbol";

export function GameField({
  className,
  cells,
  currentMove,
  nextMove,
  handleCellClick,
  winnerSequence,
  winnerSymbol
}) {
  const actions = (
    <>
      <UiButton variant="primary" size="md">
        Ничья
      </UiButton>
      <UiButton variant="outline" size="md">
        Сдаться
      </UiButton>
    </>
  );
  return (
    <GameFieldLayout className={className}>
      <GameMoveInfo
        actions={actions}
        currentMove={currentMove}
        nextMove={nextMove}
      />
      <GameGrid>
        {cells.map((symbol, index) => (
          <GameCell
            disabled={!!winnerSymbol}
            onClick={() => handleCellClick(index)}
            key={index}
            isWinner={winnerSequence?.includes(index)}
          >
            {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
          </GameCell>
        ))}
      </GameGrid>
    </GameFieldLayout>
    // <div
    //   className={clsx(
    //     className,
    //     "pt-5 pb-7 px-8 bg-white rounded-2xl shadow-md",
    //   )}
    // >
    //   <div className="flex gap-3 items-center">
    //     <div className="mr-auto">
    //       <div className="flex gap-1 items-center font-semibold text-xl leading-tight">
    //         Ход: <ZeroIcon className="w-5 h-5" />
    //       </div>
    //       <div className="flex gap-1 items-center text-slate-400 text-xs leading-tight">
    //         Следующий: <CrossIcon />
    //       </div>
    //     </div>

    //     <UiButton variant="primary" size="md">
    //       Ничья
    //     </UiButton>
    //     <UiButton variant="outline" size="md">
    //       Сдаться
    //     </UiButton>
    //   </div>

    //   <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] pl-px pt-px mt-4">
    //     {cells.map((_, i) => (
    //       <button
    //         key={i}
    //         className="border border-slate-200 -ml-px -mt-px flex items-center justify-center"
    //       ></button>
    //     ))}
    //   </div>
    // </div>
  );
}

function GameFieldLayout({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        "pt-5 pb-7 px-8 bg-white rounded-2xl shadow-md",
      )}
    >
      {children}
    </div>
  );
}

function GameCell({ children, onClick, isWinner, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-red-500",
      )}
    >
      {children}
    </button>
  );
}

function GameMoveInfo({ actions, currentMove, nextMove }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="mr-auto">
        <div className="flex gap-1 items-center font-semibold text-xl leading-tight">
          Ход: <GameSymbol symbol={currentMove} className="w-5 h-5" />
        </div>
        <div className="flex gap-1 items-center text-slate-400 text-xs leading-tight">
          Следующий: <GameSymbol symbol={nextMove} className="w-3 h-3" />
        </div>
      </div>
      {actions}
    </div>
  );
}

function GameGrid({ children }) {
  return (
    <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] pl-px pt-px mt-4">
      {children}
    </div>
  );
}
