import { create } from 'zustand';

type Lane = 'left' | 'center' | 'right';
type Direction = 'forward' | 'backward' | 'left' | 'right';

interface Position {
  y: number;  // 垂直位置 (0-100)
  lane: Lane; // 所在的道路
}

interface GameStore {
  gameState: 'menu' | 'character-select' | 'battle';
  setGameState: (state: GameState) => void;
  selectedCharacter: number | null;
  setSelectedCharacter: (character: number | null) => void;
  aiCharacter: number | null;
  setAiCharacter: (character: number | null) => void;
  
  // 遊戲狀態
  playerPosition: Position;
  aiPosition: Position;
  playerScore: number;
  aiScore: number;
  playerBlocking: boolean;
  aiBlocking: boolean;
  playerThrusting: boolean;
  aiThrusting: boolean;
  canMove: boolean; // 新增：控制是否可以移動
  
  // 動作方法
  movePlayer: (direction: Direction) => void;
  playerThrust: () => void;
  playerBlock: () => void;
  stopPlayerBlock: () => void;
  resetRound: () => void;

  timeRemaining: number; // 剩餘時間（秒）
  isGameOver: boolean;
  resetGame: () => void;
  startTimer: () => void;
  stopTimer: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'menu',
  setGameState: (state) => set({ gameState: state }),
  selectedCharacter: null,
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
  aiCharacter: null,
  setAiCharacter: (character) => set({ aiCharacter: character }),

  // 初始化狀態
  playerPosition: { y: 70, lane: 'center' },
  aiPosition: { y: 30, lane: 'center' },
  playerScore: 0,
  aiScore: 0,
  playerBlocking: false,
  aiBlocking: false,
  playerThrusting: false,
  aiThrusting: false,
  canMove: true,

  timeRemaining: 180, // 3分鐘
  isGameOver: false,

  startTimer: () => {
    const timer = setInterval(() => {
      const currentTime = get().timeRemaining;
      if (currentTime <= 0) {
        clearInterval(timer);
        set({ isGameOver: true });
        return;
      }
      set({ timeRemaining: currentTime - 1 });
    }, 1000);
  },

  stopTimer: () => {
    set({ timeRemaining: 180 });
  },

  resetGame: () => {
    set({
      playerScore: 0,
      aiScore: 0,
      timeRemaining: 180,
      isGameOver: false,
      playerPosition: { y: 70, lane: 'center' },
      aiPosition: { y: 30, lane: 'center' },
      playerThrusting: false,
      aiThrusting: false,
      playerBlocking: false,
      aiBlocking: false,
      canMove: true
    });
  },

  movePlayer: (direction) => {
    const { playerPosition, canMove } = get();
    if (!canMove) return;

    let newPosition = { ...playerPosition };

    switch (direction) {
      case 'forward':
        if (newPosition.y > 20) { // 限制前進範圍
          newPosition.y -= 5;
        }
        break;
      case 'backward':
        if (newPosition.y < 80) { // 限制後退範圍
          newPosition.y += 5;
        }
        break;
      case 'left':
        if (newPosition.lane === 'right') {
          newPosition.lane = 'center';
        } else if (newPosition.lane === 'center') {
          newPosition.lane = 'left';
        }
        break;
      case 'right':
        if (newPosition.lane === 'left') {
          newPosition.lane = 'center';
        } else if (newPosition.lane === 'center') {
          newPosition.lane = 'right';
        }
        break;
    }

    set({ playerPosition: newPosition });
  },

  playerThrust: () => {
    const { playerBlocking, canMove, playerPosition, aiPosition } = get();
    console.log('Thrust triggered');
    
    if (playerBlocking || !canMove) {
      console.log('Cannot thrust - blocking or cannot move');
      return;
    }

    set({ playerThrusting: true, canMove: false });

    // 檢查是否擊中
    if (playerPosition.lane === aiPosition.lane) {
      console.log('Same lane');
      const distance = Math.abs(playerPosition.y - aiPosition.y);
      console.log('Distance:', distance);
      
      if (distance < 15) {
        console.log('Hit detected! Adding score...');
        
        // 只在這裡更新分數，移除其他更新分數的地方
        set(state => {
          const newScore = state.playerScore + 1; // 每次只加一分
          console.log('New score:', newScore);
          
          // 如果達到勝利條件，設置遊戲結束
          if (newScore >= 15) {
            return {
              playerScore: newScore,
              isGameOver: true,
              playerThrusting: false,
              canMove: true
            };
          }
          
          return {
            playerScore: newScore,
            playerThrusting: false,
            canMove: true
          };
        });

        // 重置回合
        setTimeout(() => {
          console.log('Resetting round...');
          get().resetRound();
        }, 500);
        
        return;
      }
    }

    // 如果沒有擊中，延遲重置狀態
    setTimeout(() => {
      console.log('Resetting thrust state...');
      set({ 
        playerThrusting: false,
        canMove: true
      });
    }, 500);
  },

  playerBlock: () => {
    const { canMove } = get();
    if (!canMove) return;
    set({ playerBlocking: true, canMove: false });
  },

  stopPlayerBlock: () => {
    set({ playerBlocking: false, canMove: true });
  },

  resetRound: () => {
    set({
      playerPosition: { y: 70, lane: 'center' },
      aiPosition: { y: 30, lane: 'center' },
      playerThrusting: false,
      aiThrusting: false,
      playerBlocking: false,
      aiBlocking: false,
      canMove: true
    });
  },
})); 