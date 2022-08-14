import { useState } from "react";
import JoinForm from "./components/JoinForm";
import Lobby from "./components/Lobby";

// Next time: store currentPlayer by ID instead of by name
const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('')
  return (
    <div>
      {currentPlayer 
        ? <div>
          <Lobby currentPlayerId={currentPlayer}/>
        </div>
        : <JoinForm setCurrentPlayer={setCurrentPlayer}/> 
      } 
    </div>
  );
}

export default App;
