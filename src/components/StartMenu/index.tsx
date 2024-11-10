import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import LanguageSelector from './LanguageSelector';
import VolumeControl from './VolumeControl';
import ThemeSelector from './ThemeSelector';
import './StartMenu.scss';

const StartMenu = () => {
  const { t } = useTranslation();
  const setGameState = useGameStore((state) => state.setGameState);

  const handleStart = () => {
    setGameState('character-select');
  };

  return (
    <div className="start-menu">
      <div className="title-section">
        <h1>{t('menu.title')}</h1>
        <div className="subtitle">{t('menu.subtitle')}</div>
        <div className="crossed-swords"></div>
      </div>
      <LanguageSelector />
      <VolumeControl />
      <ThemeSelector />
      <button className="start-button" onClick={handleStart}>
        {t('menu.start')}
      </button>
    </div>
  );
};

export default StartMenu; 