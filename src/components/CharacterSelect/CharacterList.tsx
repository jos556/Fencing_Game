import { useGameStore } from '../../store/gameStore';
import CharacterCard from './CharacterCard';

interface CharacterListProps {
  onSelect: (characterId: number) => void;
  aiSelected: number | null;
}

const CharacterList = ({ onSelect, aiSelected }: CharacterListProps) => {
  const selectedCharacter = useGameStore((state) => state.selectedCharacter);

  return (
    <div className="character-list">
      {[1, 2, 3, 4, 5].map((id) => (
        <CharacterCard
          key={id}
          id={id}
          isSelected={selectedCharacter === id}
          isAiSelected={aiSelected === id}
          onSelect={() => onSelect(id)}
        />
      ))}
    </div>
  );
};

export default CharacterList; 