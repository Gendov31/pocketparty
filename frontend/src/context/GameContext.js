import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { games } from '../data/games';
import { useAuth } from './AuthContext';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [playerCount, setPlayerCount] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSession, setGameSession] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (gameSession) {
      const subscription = supabase
        .channel('game_updates')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'game_sessions',
          filter: `id=eq.${gameSession.id}`,
        }, (payload) => {
          console.log('Game session updated:', payload);
          setGameSession(payload.new);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [gameSession]);

  const createGameSession = async (gameId) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('game_sessions')
      .insert([
        { game_id: gameId, host_id: user.id }
      ])
      .select()
      .single();

    if (error) throw error;
    setGameSession(data);
  };

  const joinGameSession = async (sessionId) => {
    if (!user) return;

    const { error } = await supabase
      .from('game_participants')
      .insert([
        { session_id: sessionId, user_id: user.id }
      ]);

    if (error) throw error;
  };

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
    setGameStarted,
    gameSession,
    createGameSession,
    joinGameSession
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