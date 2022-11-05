import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Lobby from "./pages/Lobby";
import GamePage from "./pages/GamePage"
import { UserContext } from ".";

// Next time: store currentPlayer by ID instead of by name
const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('')
  return (
    <UserContext.Provider value={currentPlayer}>
      <BrowserRouter>
        <Routes>
          <Route path="/lobby" element={<Lobby/>}/>
          <Route path="/game" element={<GamePage />}/>
          <Route path="/" element={<Welcome setCurrentPlayer={setCurrentPlayer}/>}/> 
        </Routes> 
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
