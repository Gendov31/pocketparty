import { useEffect, useState } from 'react';
import { GameProvider } from './context/GameContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext'; // keep this import
import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { GameGrid } from './components/GameGrid/GameGrid';
import { Navigation } from './components/Navigation/Navigation';
import { GameDetail } from './components/GameDetail/GameDetail';
import { Toaster } from 'react-hot-toast';
import { AuthModal } from './components/Auth/AuthModal';
import './styles/global.css';

function App() {
  const [isMobile, setIsMobile] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading } = useAuth(); 

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isMobile) {
    return <h2 style={{ textAlign: 'center', marginTop: '50%' }}>Това приложение е достъпно само от мобилни устройства.</h2>;
  }

  return (
    <div className="app">
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <Header setShowAuthModal={setShowAuthModal} />
      <SearchBar />
      <GameGrid />
      <Navigation />
      <GameDetail />
      <Toaster position="top-center" />
    </div>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AuthProvider>
  );
}

export default AppWrapper;