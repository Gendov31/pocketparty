import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PlayerSelection } from '../PlayerSelection/PlayerSelection';
// Import other game-specific components here
// import { BlaBlaGame } from '../BlaBlaGame/BlaBlaGame';
import './GameDetail.css';

export function GameDetail() {
  const { selectedGame, setSelectedGame, setGameStarted, setPlayerCount } = useGame();
  const [showGameScreen, setShowGameScreen] = useState(false);
  
  if (!selectedGame) return null;
  
  const handleClose = () => {
    setSelectedGame(null);
    setGameStarted(false);
    setPlayerCount(null);
  };
  
  const handlePlayClick = () => {
    setShowGameScreen(true);
  };
  
  // Render the appropriate game screen based on the selected game
  if (showGameScreen) {
    if (selectedGame.id === 1) { // Шпионин (Spy)
      return <PlayerSelection onClose={() => setShowGameScreen(false)} />;
    } else if (selectedGame.id === 2) { // БлаБла
      // You would return the BlaBla game component when it's available
      // return <BlaBlaGame onClose={() => setShowGameScreen(false)} />;
      
      // For now, let's return a placeholder
      return (
        <div className="blabla-game-container">
          <div className="header-with-rules">
            <button className="back-button" onClick={() => setShowGameScreen(false)}>&larr;</button>
            <h2>{selectedGame.title}</h2>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>БлаБла Game</h1>
            <p>This is the specific screen for the БлаБла game.</p>
            <p>You should implement a separate component for this game.</p>
          </div>
          <button 
              style={{ padding: "10px 20px", margin: "20px", backgroundColor: "white", color: "#ff6b6b", border: "none", borderRadius: "5px" }}
              onClick={() => setShowGameScreen(false)}
            >
              Go Back
            </button>
        </div>
        
      );
    } else {
      // Default fallback for any other game
      return <PlayerSelection onClose={() => setShowGameScreen(false)} />;
    }
  }
  
  // Game detail page (same for all games)
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
          <span>Гледай сада</span>
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