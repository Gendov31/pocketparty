import { createContext, useContext, useState } from 'react';
import { games } from '../data/games';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [playerCount, setPlayerCount] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = {
    games: filteredGames,
    searchTerm,
    setSearchTerm,
    selectedGame,
    setSelectedGame,
    playerCount,
    setPlayerCount,
    gameStarted,
    setGameStarted
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}