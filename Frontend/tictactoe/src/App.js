import "./App.css";
import GameBoard from "./Components/GameBoard";
import { useState, useEffect } from "react";
import Loading from "./Components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

  return <div className="App">{isLoading ? <Loading /> : <GameBoard />}</div>;
}

export default App;
