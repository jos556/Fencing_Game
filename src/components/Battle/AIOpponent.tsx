import { useGameStore } from '../../store/gameStore';

interface AIOpponentProps {
  position: {
    x: number;
    y: number;
  };
}

const AIOpponent = ({ position }: AIOpponentProps) => {
  const aiCharacter = useGameStore((state) => state.aiCharacter);

  const suitColors = {
    1: {
      main: '#FFFFFF',
      accent: '#0066CC',
    },
    2: {
      main: '#FF3333',
      accent: '#FFFFFF',
    },
    3: {
      main: '#000000',
      accent: '#FFD700',
    },
    4: {
      main: '#006633',
      accent: '#FFFFFF',
    },
    5: {
      main: '#6600CC',
      accent: '#FFCC00',
    }
  };

  if (!aiCharacter) return null;

  return (
    <div 
      className="ai-character"
      style={{ 
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      <div className="character-body">
        <div className="head">
          <div className="mask" style={{
            borderColor: suitColors[aiCharacter].accent
          }}></div>
        </div>
        <div className="torso" style={{
          backgroundColor: suitColors[aiCharacter].main
        }}>
          <div className="stripe" style={{
            backgroundColor: suitColors[aiCharacter].accent
          }}></div>
        </div>
        <div className="legs">
          <div className="leg" style={{
            backgroundColor: suitColors[aiCharacter].main
          }}></div>
        </div>
        <div className="sword"></div>
      </div>
    </div>
  );
};

export default AIOpponent; 