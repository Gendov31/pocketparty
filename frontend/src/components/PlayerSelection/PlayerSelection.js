import { useGame } from '../../context/GameContext';
import './PlayerSelection.css';

export function PlayerSelection({ onClose }) {
  const { selectedGame, setGameStarted, setPlayerCount } = useGame();
  const minPlayers = parseInt(selectedGame.players);
  const maxPlayers = minPlayers + 5;
  const playerCounts = Array.from(
    { length: maxPlayers - minPlayers + 1 },
    (_, i) => minPlayers + i
  );

  const handleContinue = () => {
    const selectedCount = document.querySelector('.player-count.active')?.dataset.count;
    if (selectedCount) {
      setPlayerCount(parseInt(selectedCount));
      setGameStarted(true);
    }
  };

  return (
    <div className="player-selection-page">
      <div className="header-with-rules">
        <button className="back-button" onClick={onClose}>&larr;</button>
        <button className="rules-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
          </svg>
          Правила
        </button>
      </div>

      <h1 className="ingame-title">{selectedGame.title}</h1>

      <div className="player-count-section">
        <h2>Колко играчи ще участват?</h2>
        <div className="player-selector">
          <div className="player-icon"></div>
          <div className="player-selector-scroll">
            {playerCounts.map(count => (
              <div
                key={count}
                className={`player-count ${count === minPlayers ? 'active' : ''}`}
                data-count={count}
                onClick={(e) => {
                  document.querySelectorAll('.player-count').forEach(el => el.classList.remove('active'));
                  e.target.classList.add('active');
                }}
              >
                {count}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="continue-button" onClick={handleContinue}>
        Продължи
      </button>
    </div>
  );
}