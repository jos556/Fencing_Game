import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

const VolumeControl = () => {
  const { t } = useTranslation();
  const { volume, setVolume } = useSettingsStore();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="volume-control">
      <h3>{t('menu.volume')}</h3>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl; 