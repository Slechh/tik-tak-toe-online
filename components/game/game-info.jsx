import clsx from "clsx";
import { Profile } from "../profile";
import { CrossIcon } from "./icons/cross-icon";
import { ZeroIcon } from "./icons/zero-icon";

export function GameInfo({ className }) {
  return (
    <div
      className={clsx(
        className,
        "bg-white py-4 px-8 rounded-2xl shadow-md flex justify-between",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Profile className="w-44" />
          <div className="w-5 h-5 absolute bg-white rounded-full shadow -left-1 -top-1 flex items-center justify-center">
            <CrossIcon />
          </div>
        </div>
        <div className="w-px h-6 bg-slate-200" />
        <div className="text-slate-900 text-lg font-semibold">01:08</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-orange-600 text-lg font-semibold">00:08</div>
        <div className="w-px h-6 bg-slate-200" />
        <div className="relative">
          <Profile className="w-44" />
          <div className="w-5 h-5 absolute bg-white rounded-full shadow -left-1 -top-1 flex items-center justify-center">
            <ZeroIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
