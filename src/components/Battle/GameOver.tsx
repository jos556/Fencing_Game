import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import './GameOver.scss';

const GameOver = () => {
  const { t } = useTranslation();
  const { playerScore, aiScore, resetGame, setGameState } = useGameStore();

  const handleRestart = () => {
    resetGame();
    setGameState('battle');
  };

  const handleExit = () => {
    resetGame();
    setGameState('menu');
  };

  return (
    <div className="game-over">
      <div className="result-board">
        <h2>{t('battle.gameOver')}</h2>
        <div className="final-score">
          <span className="player-score">{playerScore}</span>
          <span className="separator">-</span>
          <span className="ai-score">{aiScore}</span>
        </div>
        <div className="winner">
          {playerScore > aiScore ? t('battle.playerWins') : t('battle.aiWins')}
        </div>
        <div className="buttons">
          <button className="restart-button" onClick={handleRestart}>
            {t('battle.playAgain')}
          </button>
          <button className="exit-button" onClick={handleExit}>
            {t('battle.exit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver; 