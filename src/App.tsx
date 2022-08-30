import { useState } from "react";
import Welcome from "./pages/Welcome";
import Lobby from "./pages/Lobby";
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
        : <Welcome setCurrentPlayer={setCurrentPlayer}/> 
      } 
    </UserContext.Provider>
  );
}

export default App;
