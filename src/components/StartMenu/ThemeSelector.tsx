import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

const themes = ['classic', 'modern', 'medieval'];

const ThemeSelector = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="theme-selector">
      <h3>{t('menu.theme')}</h3>
      <div className="theme-buttons">
        {themes.map((themeOption) => (
          <button
            key={themeOption}
            className={theme === themeOption ? 'active' : ''}
            onClick={() => setTheme(themeOption)}
          >
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 