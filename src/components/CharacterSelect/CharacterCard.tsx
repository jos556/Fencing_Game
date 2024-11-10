interface CharacterCardProps {
  id: number;
  isSelected: boolean;
  isAiSelected: boolean;
  onSelect: () => void;
}

const CharacterCard = ({ id, isSelected, isAiSelected, onSelect }: CharacterCardProps) => {
  // 不同的擊劍服配色
  const suitColors = {
    1: {
      main: '#FFFFFF', // 傳統白色
      accent: '#0066CC', // 藍色裝飾
    },
    2: {
      main: '#FF3333', // 紅色
      accent: '#FFFFFF', // 白色裝飾
    },
    3: {
      main: '#000000', // 黑色
      accent: '#FFD700', // 金色裝飾
    },
    4: {
      main: '#006633', // 綠色
      accent: '#FFFFFF', // 白色裝飾
    },
    5: {
      main: '#6600CC', // 紫色
      accent: '#FFCC00', // 金色裝飾
    }
  };

  const names = {
    1: '經典白',
    2: '熱血紅',
    3: '暗夜黑',
    4: '翡翠綠',
    5: '皇室紫'
  };

  const descriptions = {
    1: '傳統擊劍服的典範\n象徵純粹與專注的競技精神',
    2: '充滿激情的配色\n展現選手熱血沸騰的比賽態度',
    3: '靈感來自職業賽事\n盡顯沉穩與力量的氣質',
    4: '取材自奧運精神\n象徵生機與活力的突破',
    5: '靈感源自古典劍術\n展現高貴優雅的風範'
  };

  return (
    <div 
      className={`character-card ${isSelected ? 'selected' : ''} ${isAiSelected ? 'ai-selected' : ''}`}
      onClick={onSelect}
    >
      <div className="character-preview">
        <div className="body">
          {/* 頭部 */}
          <div className="head" style={{ 
            backgroundColor: suitColors[id as keyof typeof suitColors].main 
          }} />
          {/* 身體 */}
          <div className="torso">
            <div className="suit" style={{ 
              backgroundColor: suitColors[id as keyof typeof suitColors].main,
              borderLeft: `2px solid ${suitColors[id as keyof typeof suitColors].accent}`,
              borderRight: `2px solid ${suitColors[id as keyof typeof suitColors].accent}`
            }} />
          </div>
          {/* 腿部 */}
          <div className="legs">
            <div className="leg left" style={{ 
              backgroundColor: suitColors[id as keyof typeof suitColors].main 
            }} />
            <div className="leg right" style={{ 
              backgroundColor: suitColors[id as keyof typeof suitColors].main 
            }} />
          </div>
          {/* 面罩 */}
          <div className="mask" style={{
            borderColor: suitColors[id as keyof typeof suitColors].accent
          }} />
          {/* 劍 */}
          <div className="sword" />
        </div>
      </div>
      <div className="character-info">
        <div className="name">{names[id as keyof typeof names]}</div>
        <div className="description">
          {descriptions[id as keyof typeof descriptions].split('\n').map((line, index) => (
            <div key={index} className="description-line">{line}</div>
          ))}
        </div>
      </div>
      {isAiSelected && (
        <div className="ai-badge">AI</div>
      )}
    </div>
  );
};

export default CharacterCard; 