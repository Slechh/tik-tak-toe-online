export function GameLayout({ backLink, gameTitle, gameInfo, playersList }) {
  return (
    <div>
      <div className="pl-2">
        {backLink}
        {gameTitle}
        {gameInfo}
      </div>
      <div className="mt-4 bg-white py-4 px-8 rounded-2xl shadow-md justify-between grid grid-cols-2 gap-2">
        {playersList}
      </div>
    </div>
  );
}
