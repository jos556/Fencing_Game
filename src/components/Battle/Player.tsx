import { useGameStore } from '../../store/gameStore';

interface PlayerProps {
  position: {
    x: number;
    y: number;
  };
  isThrusting: boolean;
  isBlocking: boolean;
}

const Player = ({ position, isThrusting, isBlocking }: PlayerProps) => {
  const selectedCharacter = useGameStore((state) => state.selectedCharacter);

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

  if (!selectedCharacter) return null;

  return (
    <div 
      className={`player-character ${isThrusting ? 'thrusting' : ''} ${isBlocking ? 'blocking' : ''}`}
      style={{ 
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      <div className="character-body">
        <div className="head">
          <div className="mask" style={{
            borderColor: suitColors[selectedCharacter].accent
          }}></div>
        </div>
        <div className="torso" style={{
          backgroundColor: suitColors[selectedCharacter].main
        }}>
          <div className="stripe" style={{
            backgroundColor: suitColors[selectedCharacter].accent
          }}></div>
        </div>
        <div className="legs">
          <div className="leg" style={{
            backgroundColor: suitColors[selectedCharacter].main
          }}></div>
        </div>
        <div className="sword"></div>
      </div>
    </div>
  );
};

export default Player; 