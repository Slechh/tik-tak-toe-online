import { StarIcon } from "./icons/star-icon";
import { HistoryIcon } from "./icons/history-icon";
import { UserIcon } from "./icons/user-icon";

export function GameInfo({ playersCount, isRatingGame, timeMode }) {
  return (
    <div className="flex items-center gap-3 text-slate-400 text-xs">
      {isRatingGame && <StarIcon />}
      <div className="gap-1 flex items-center">
        <UserIcon /> {playersCount}
      </div>
      <div className="gap-1 flex items-center">
        <HistoryIcon /> {timeMode}
      </div>
    </div>
  );
}
