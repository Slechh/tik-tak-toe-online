import { SquareIcon } from "./icons/square-icon";
import { TriangleIcon } from "./icons/triangle-icon";
import { CrossIcon } from "./icons/cross-icon";
import { ZeroIcon } from "./icons/zero-icon";
import { GAME_SYMBOLS } from "./constants";

export function GameSymbol({ symbol, className }) {
  const Icon = {
    [GAME_SYMBOLS.CROSS]: CrossIcon,
    [GAME_SYMBOLS.ZERO]: ZeroIcon,
    [GAME_SYMBOLS.TRIANGLE]: TriangleIcon,
    [GAME_SYMBOLS.SQUARE]: SquareIcon,
  }[symbol] ?? CrossIcon;
    console.log(GAME_SYMBOLS.CROSS)
  return <Icon className={className}/>;
}
