import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import CharacterList from './CharacterList';
import './CharacterSelect.scss';
import { useEffect, useState } from 'react';

const CharacterSelect = () => {
  const { t } = useTranslation();
  const setGameState = useGameStore((state) => state.setGameState);
  const { selectedCharacter, setSelectedCharacter, setAiCharacter } = useGameStore();
  const [aiSelected, setAiSelected] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(2);

  const handleCharacterSelect = (characterId: number) => {
    if (selectedCharacter === characterId) {
      setSelectedCharacter(null);
      setAiSelected(null);
    } else {
      setSelectedCharacter(characterId);
      setTimeout(() => {
        let aiChoice;
        do {
          aiChoice = Math.floor(Math.random() * 5) + 1;
        } while (aiChoice === characterId);
        setAiSelected(aiChoice);
      }, 0);
    }
  };

  const handleConfirm = () => {
    if (selectedCharacter && aiSelected) {
      setAiCharacter(aiSelected);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimeout(() => {
              setGameState('battle');
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleCancel = () => {
    setSelectedCharacter(null);
    setAiSelected(null);
  };

  return (
    <div className="character-select">
      <h2>{t('character.select')}</h2>
      {selectedCharacter && (
        <div className="action-buttons">
          <button 
            className="cancel-button"
            onClick={handleCancel}
          >
            {t('character.cancel')}
          </button>
          <button 
            className="confirm-button"
            onClick={handleConfirm}
          >
            {countdown < 2 ? countdown : t('character.confirm')}
          </button>
        </div>
      )}
      <CharacterList 
        onSelect={handleCharacterSelect} 
        aiSelected={aiSelected}
      />
    </div>
  );
};

export default CharacterSelect; 