import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {


  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {

    if (winner) return null;

    if (board[index] !== "") return null;

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
    );
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O");
      if (cells.every(cell => cell === "X")) setWinner("X");
    });

    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) {
      setWinner("E")
    }
  };

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  useEffect(checkWinner, [board]);


  return (
    <main>
      <h1 className='title'>Jogo da velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>

        {board.map((item, index) => (
          <div
            className={`cell ${item}`}
            key={index}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}

      </div>

      {winner &&
        <footer>
          <h2 className='winner-message'>
            {winner !== "E" ? <span className={winner}>{winner} venceu!</span>
            :
            <span className={winner}>Empatou!</span>
      }
          </h2>

          <button onClick={resetGame}>Recomeçar Jogo!</button>
        </footer>
      }

    </main>
  );
}

export default TicTacToe;
