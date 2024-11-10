import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    setLanguage(lang);
  };

  return (
    <div className="language-selector">
      <h3>{t('menu.language')}</h3>
      <div className="language-buttons">
        <button 
          className={language === 'zh' ? 'active' : ''} 
          onClick={() => handleLanguageChange('zh')}
        >
          繁體中文
        </button>
        <button 
          className={language === 'en' ? 'active' : ''} 
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector; 