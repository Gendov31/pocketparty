import { useGame } from '../../context/GameContext';
import { PlayerSelection } from '../PlayerSelection/PlayerSelection';
import { GamePlay } from '../GamePlay/GamePlay';
import './GameDetail.css';

export function GameDetail() {
  const { selectedGame, setSelectedGame, gameStarted, setGameStarted, setPlayerCount } = useGame();

  if (!selectedGame) return null;

  const handleClose = () => {
    setSelectedGame(null);
    setGameStarted(false);
    setPlayerCount(null);
  };

  const handlePlayClick = () => {
    setGameStarted(true);
  };

  if (gameStarted) {
    return <GamePlay onClose={handleClose} />;
  }

  return (
    <div className="game-detail-page">
      <div className="game-detail-header">
        <button className="back-button" onClick={handleClose}>&larr;</button>
        <h2>{selectedGame.title}</h2>
      </div>
      
      <div className="video-container">
        <img src={selectedGame.image} alt={selectedGame.title} />
        <div className="video-overlay">
          <div className="play-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill="#8b5cf6"/>
            </svg>
          </div>
          <span>Гледай сега</span>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat">
          <div className="stat-value">{selectedGame.players}+</div>
          <div className="stat-label">Играчи</div>
        </div>
        <div className="stat">
          <div className="stat-value">{selectedGame.age}+</div>
          <div className="stat-label">Години</div>
        </div>
        <div className="stat">
          <div className="stat-value">{selectedGame.minutes}</div>
          <div className="stat-label">Минути</div>
        </div>
      </div>

      <div className="game-description">
        {selectedGame.description}
      </div>

      <button className="play-game-button" onClick={handlePlayClick}>
        Нека играем!
      </button>
    </div>
  );
}