import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import StartMenu from './components/StartMenu';
import CharacterSelect from './components/CharacterSelect';
import Battle from './components/Battle';
import './App.scss';

function App() {
  const gameState = useGameStore((state) => state.gameState);

  return (
    <div className="app">
      {gameState === 'menu' && <StartMenu />}
      {gameState === 'character-select' && <CharacterSelect />}
      {gameState === 'battle' && <Battle />}
    </div>
  );
}

export default App; 