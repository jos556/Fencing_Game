import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import './ScoreBoard.scss';

const ScoreBoard = () => {
  const { t } = useTranslation();
  const { playerScore, aiScore, timeRemaining } = useGameStore();
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="score-board">
      <div className="score">
        <span className="player-score">{playerScore}</span>
        <span className="separator">-</span>
        <span className="ai-score">{aiScore}</span>
      </div>
      <div className="time">{formatTime(timeRemaining)}</div>
    </div>
  );
};

export default ScoreBoard; 