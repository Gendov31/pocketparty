import { GameProvider } from './context/GameContext';
import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { GameGrid } from './components/GameGrid/GameGrid';
import { Navigation } from './components/Navigation/Navigation';
import { GameDetail } from './components/GameDetail/GameDetail';
import './styles/global.css';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <Header />
        <SearchBar />
        <GameGrid />
        <Navigation />
        <GameDetail />
      </div>
    </GameProvider>
  );
}

export default App;