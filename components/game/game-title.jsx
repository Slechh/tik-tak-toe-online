import Link from "next/link";
import { ArrowLeftIcon } from "./icons/arrow-left-icon";
import { HistoryIcon } from "./icons/history-icon";
import { StarIcon } from "./icons/star-icon";
import { UserIcon } from "./icons/user-icon";

export function GameTitle() {
  return (
    <div className="pl-2">
      <Link
        href="#"
        className="flex items-center gap-2 text-teal-600 text-xs leading-tight -mb-0.5"
      >
        <ArrowLeftIcon />
        На главную
      </Link>
      <h1 className="leading-tight text-4xl">Крестики нолики</h1>
      <div className="flex items-center gap-3 text-slate-400 text-xs">
        <StarIcon />
        <div className="gap-1 flex items-center">
          <UserIcon /> 2
        </div>
        <div className="gap-1 flex items-center">
          <HistoryIcon /> 1 мин на ход
        </div>
      </div>
    </div>
  );
}
