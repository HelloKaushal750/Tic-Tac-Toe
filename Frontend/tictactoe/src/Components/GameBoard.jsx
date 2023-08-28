import { useEffect, useState } from "react";
import "../Styles/GameBoard.css";
import Confetti from "react-confetti";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import AllGames from "./AllGames";

function GameBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [boolean, setBoolean] = useState(true);
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    console.log(boolean);
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
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        axios
          .post("http://localhost:7000/games", {
            data: board,
            result: `${board[a]} was Winner`,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setWinner(board[a]);
        setBoolean(false);
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("DRAW");
      setBoolean(false);
    }
  };

  const renderWinnerMessage = () => {
    if (winner === "X") {
      return <div className="winner">{`Player 1 is Winner`}</div>;
    } else if (winner === "O") {
      return <div className="winner">{`Player 2 is Winner`}</div>;
    } else if (winner === "DRAW") {
      return <div className="draw">It's a Draw</div>;
    } else {
      return null;
    }
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setBoolean(true);
  };

  const handlePreviousGame = () => {
    axios
      .get("http://localhost:7000/games")
      .then((res) => {
        setPrevious(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="tictactoegame">
      {(winner === "X" || winner === "O") && <Confetti recycle={false} />}
      <div class="fade-in-heading">
        <h1 className="heading">Welcome To Tic-Tac-Toe</h1>
      </div>
      {boolean ? (
        <div
          style={{
            height: "50px",
            marginTop: "-10px",
            marginBottom: "-20px",
            color: "white",
            display: "flex",
            gap: "80px",
            justifyContent: "center",
            animation: "fadeIn 5s",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          <h1>
            Player 1 : <span style={{ color: "#0d9bea" }}>X</span>
          </h1>
          <h1>
            Player 2 : <span style={{ color: "#fe0202" }}>O</span>
          </h1>
        </div>
      ) : (
        <div style={{ height: "50px", marginTop: "-30px" }}>
          {renderWinnerMessage()}
        </div>
      )}
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          margin: "auto",
          width: "30%",
        }}
      >
        <button onClick={handleNewGame} className="newgame">
          New Game
        </button>
        <button
          onClick={() => {
            handlePreviousGame();
            onOpen();
          }}
          className="newgame"
        >
          Previous Games
        </button>
      </div>
      <AllGames
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        previous={previous}
      />
    </div>
  );
}

export default GameBoard;
