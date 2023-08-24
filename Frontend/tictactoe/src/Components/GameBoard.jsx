import { useEffect, useState } from "react";
import "../Styles/GameBoard.css";

function GameBoard() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleClick = (index) => {
    if (board[index] === "" && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [6, 4, 2], // Diagonal
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== "/" && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("DRAW");
    }
  };

  const renderWinnerMessage = () => {
    if (winner === "X" || winner === "O") {
      return <div data-testid="winner">{`${winner} Is Winner`}</div>;
    } else if (winner === "DRAW") {
      return <div data-testid="winner">Draw</div>;
    } else {
      return null;
    }
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="tictactoegame">
      <div class="fade-in-heading">
        <h1 className="heading">Welcome To Tic-Tac-Toe</h1>
      </div>
      <div className="game_board">
        {board?.map((value, index) => {
          return (
            <button
              onClick={() => handleClick(index)}
              style={
                value === "X" ? { color: "#0d9bea" } : { color: "#fe0202" }
              }
            >
              {value}
            </button>
          );
        })}
      </div>
      <div className="winnername">{renderWinnerMessage()}</div>
      <div>
        <button onClick={handleNewGame} className="newgame">
          New Game
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
