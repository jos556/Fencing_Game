import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import Player from './Player';
import AIOpponent from './AIOpponent';
import Referee from './Referee';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import './Battle.scss';

const Battle = () => {
  const { t } = useTranslation();
  const {
    setGameState,
    movePlayer,
    playerThrust,
    playerBlock,
    stopPlayerBlock,
    playerPosition,
    aiPosition,
    playerThrusting,
    playerBlocking,
    addScore,
    timeRemaining,
    isGameOver,
    startTimer,
  } = useGameStore();

  useEffect(() => {
    startTimer();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 生成觀眾
  const generateAudience = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className="audience-member">
        <div className="head"></div>
        <div className="body"></div>
      </div>
    ));
  };

  // 檢查是否擊中
  const checkHit = () => {
    if (playerPosition.lane === aiPosition.lane && 
        Math.abs(playerPosition.y - aiPosition.y) < 15) {
      addScore('player');
    }
  };

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
          movePlayer('forward');
          break;
        case 's':
          movePlayer('backward');
          break;
        case 'a':
          movePlayer('left');
          break;
        case 'd':
          movePlayer('right');
          break;
        case 'f':
          playerThrust();
          checkHit(); // 檢查是否擊中
          break;
        case 'g':
          playerBlock();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') {
        stopPlayerBlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPosition, aiPosition]); // 添加依賴

  const getLanePosition = (lane: 'left' | 'center' | 'right') => {
    switch (lane) {
      case 'left': return 30;
      case 'center': return 50;
      case 'right': return 70;
    }
  };

  return (
    <div className="battle-scene">
      <ScoreBoard />
      <div className="timer">{formatTime(timeRemaining)}</div>
      <div className="battle-area">
        <div className="audience-left">
          {generateAudience(50)}
        </div>
        <div className="audience-right">
          {generateAudience(50)}
        </div>
        <div className="fencing-piste">
          <Player 
            position={{
              x: getLanePosition(playerPosition.lane),
              y: playerPosition.y
            }}
            isThrusting={playerThrusting}
            isBlocking={playerBlocking}
          />
          <AIOpponent 
            position={{
              x: getLanePosition(aiPosition.lane),
              y: aiPosition.y
            }}
          />
          <Referee />
        </div>
      </div>
      <button className="exit-button" onClick={() => setGameState('menu')}>
        {t('battle.exit')}
      </button>
      {isGameOver && <GameOver />}
    </div>
  );
};

export default Battle; 