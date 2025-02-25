import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import './GamePlay.css';

export function GamePlay({ onClose }) {
  const { playerCount } = useGame();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [spyIndex] = useState(() => Math.floor(Math.random() * playerCount) + 1);
  const [timeLeft, setTimeLeft] = useState(playerCount * 2 * 60);
  const [gamePhase, setGamePhase] = useState('selection'); // 'selection' | 'playing' | 'voting'
  const [locations] = useState([
    'Банка', 'Болница', 'Училище', 'Ресторант', 'Летище',
    'Плаж', 'Хотел', 'Мол', 'Кино', 'Зоопарк', 'Обществена тоалетна'
  ]);
  const [chosenLocation] = useState(() => 
    locations[Math.floor(Math.random() * locations.length)]
  );

  useEffect(() => {
    let timer;
    if (gamePhase === 'playing') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGamePhase('voting');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gamePhase]);

  const handleCardClick = (index) => {
    if (selectedCards.has(index)) return;

    const message = index === spyIndex
      ? 'Ти си Шпионин.'
      : `Тайната локация е\n\n${chosenLocation}`;

    showPopup(message, () => {
      setSelectedCards(prev => new Set([...prev, index]));
      if (currentPlayer < playerCount) {
        showHandPhonePopup();
      } else {
        setGamePhase('playing');
      }
    });
  };

  const showPopup = (message, onOk) => {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
      <div class="popup">
        <div class="popup-content">${message}</div>
        <button class="popup-button">Готово</button>
      </div>
    `;
    document.body.appendChild(popup);
    
    popup.querySelector('button').onclick = () => {
      popup.remove();
      if (onOk) onOk();
    };
  };

  const showHandPhonePopup = () => {
    showPopup('ПОДАЙ ТЕЛЕФОНА НА СЛЕДВАЩИЯ ИГРАЧ', () => {
      setCurrentPlayer(prev => prev + 1);
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (gamePhase === 'selection') {
    return (
      <div className="game-play-page">
        <div className="header-with-rules">
          <button className="back-button" onClick={onClose}>&larr;</button>
          <h2>Играч {currentPlayer}</h2>
          <button className="rules-button">Правила</button>
        </div>
        <div className="game-instructions">
          <h1>1. Скрий екрана на телефона си</h1>
          <h1>2. Избери карта</h1>
        </div>
        <div className="cards-grid">
          {Array.from({ length: playerCount }, (_, i) => i + 1).map(index => (
            <div
              key={index}
              className={`card ${selectedCards.has(index) ? 'selected' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {selectedCards.has(index) ? '👤' : '?'}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <div className="game-play-page">
        <div className="game-header">
          <h2>Разкрий шпионина преди да изтече времето!</h2>
        </div>
        <div className="timer">{formatTime(timeLeft)}</div>
        <button className="vote-button" onClick={() => setGamePhase('voting')}>
          Гласувай сега
        </button>
      </div>
    );
  }

  return (
    <div className="game-play-page">
      <div className="voting-content">
        <h2>Гласуване</h2>
        <p>
          Всеки играч гласува за този, когото подозира, че е Шпионинът. 
          Необходимо е мнозинство, за да бъде обвинен някой. Ако няма мнозинство, 
          ще трябва да прегласувате, докато такова не бъде постигнато.
        </p>
        <button className="continue-button" onClick={onClose}>
          Край на играта
        </button>
      </div>
    </div>
  );
}