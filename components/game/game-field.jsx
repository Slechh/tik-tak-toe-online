import clsx from "clsx";
import { ZeroIcon } from "./icons/zero-icon";
import { CrossIcon } from "./icons/cross-icon";
import { UiButton } from "../uikit/ui-button";

const cells = new Array(19 * 19).fill(null);

export function GameField({ className }) {
  return (
    <div
      className={clsx(
        className,
        "pt-5 pb-7 px-8 bg-white rounded-2xl shadow-md",
      )}
    >
      <div className="flex gap-3 items-center">
        <div className="mr-auto">
          <div className="flex gap-1 items-center font-semibold text-xl leading-tight">
            Ход: <ZeroIcon className="w-5 h-5" />
          </div>
          <div className="flex gap-1 items-center text-slate-400 text-xs leading-tight">
            Следующий: <CrossIcon />
          </div>
        </div>

        <UiButton variant="primary" size="md">
          Ничья
        </UiButton>
        <UiButton variant="outline" size="md">
          Сдаться
        </UiButton>
      </div>

      <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] pl-px pt-px mt-4">
        {cells.map((_, i) => (
          <button
            key={i}
            className="border border-slate-200 -ml-px -mt-px flex items-center justify-center"
          >
            <ZeroIcon className="w-5 h-5"/>
          </button>
        ))}
      </div>
    </div>
  );
}
