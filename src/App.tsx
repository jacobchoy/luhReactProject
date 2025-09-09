import "./App.css";
import { useState } from "react";

function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <button className="square-btn" onClick={onSquareClick}>
      {value ?? ""}
    </button>
  );
}

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function calcWin(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    if (calcWin(nextSquares)) {
      //make the winner show up
    }
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <main className="tictactoe">
      <div className="board">
        <h1>tic tac toe baby</h1>
        <p className="turn">Turn: {xIsNext ? "X" : "O"} </p>
        <div className="grid-3">
          {squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onSquareClick={() => handleClick(i)}
            />
          ))}
        </div>
        <button className="square-btn reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </main>
  );
}

export default App;
