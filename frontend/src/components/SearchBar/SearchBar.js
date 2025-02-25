import { useGame } from '../../context/GameContext';
import './SearchBar.css';

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useGame();

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Намерете Вашата Игра"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}