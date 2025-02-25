import { useGame } from '../../context/GameContext';
import { GameCard } from '../GameCard/GameCard';
import './GameGrid.css';

export function GameGrid() {
  const { games } = useGame();

  return (
    <div className="games-section">
      <div className="section-title">
        <h3>Всички игри</h3>
        <a href="#" className="view-all">Виж всички</a>
      </div>
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}