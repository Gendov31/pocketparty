import { useGame } from '../../context/GameContext';
import './GameCard.css';

export function GameCard({ game }) {
  const { setSelectedGame } = useGame();

  return (
    <div className="game-card" onClick={() => setSelectedGame(game)}>
      <img src={game.image} alt={game.title} className="game-image" />
      <div className="game-details">
        <h3 className="game-title">{game.title}</h3>
        <div className="game-info">
          <span>{game.players}+ Играчи</span>
          <span>{game.age}+ Години</span>
          <span>{game.minutes} Минути</span>
        </div>
      </div>
    </div>
  );
}