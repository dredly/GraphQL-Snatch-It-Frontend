import { useState } from "react";
import JoinForm from "./components/JoinForm";
import Lobby from "./components/Lobby";
import { UserContext } from ".";

// Next time: store currentPlayer by ID instead of by name
const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('')
  return (
    <UserContext.Provider value={currentPlayer}>
      {currentPlayer 
        ? <div>
          <Lobby />
        </div>
        : <JoinForm setCurrentPlayer={setCurrentPlayer}/> 
      } 
    </UserContext.Provider>
  );
}

export default App;
