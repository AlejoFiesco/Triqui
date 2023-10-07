import './App.css';
import { useEffect } from 'react';
import Board from './components/board';
import useGame from './model/gameUtil';

function App() {

  const Game = useGame()

  useEffect(() => {
    Game.newGame();
  }, [])

  return (
    <div className="App">
      <h1>Triqui</h1>
      <Board Game={Game} />
      <span>Turno {Game.currentPiece} </span>
      {(Game.winner !== null)
        && <>
          {
            Game.winner === 'draw'
              ? <h2>Hubo un empate</h2>
              : <h2>El ganador es {Game.currentPiece}</h2>
          }
        </>

      }
      <br />
      <button onClick={Game.newGame}>Reiniciar juego</button>
    </div>
  );
}

export default App;
