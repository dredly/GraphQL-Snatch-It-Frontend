import { useState } from "react";
import JoinForm from "./components/JoinForm";
import Lobby from "./components/Lobby";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('')
  return (
    <div>
      {currentPlayer 
        ? <div>
          <Lobby />
        </div>
        : <JoinForm setCurrentPlayer={setCurrentPlayer}/> 
      } 
    </div>
  );
}

export default App;
