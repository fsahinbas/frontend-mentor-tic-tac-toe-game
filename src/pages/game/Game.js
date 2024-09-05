import React, { useEffect, useState } from "react";
import Cell from "../../components/cell/Cell";
import { useSearchParams } from "react-router-dom";
import GameOver from "../../components/gameOver/GameOver";
import Restart from "../../components/restart/Restart";
import styles from "./game.module.css";

const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPlayer, setCurrentPlayer] = useState("cross");
  const [pickedPlayer, setPickedPlayer] = useState(searchParams.get("player"));
  const [pickedGameType, setPickedGameType] = useState(searchParams.get("vs"));
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scoreCross, setScoreCross] = useState(0);
  const [scoreCircle, setScoreCircle] = useState(0);
  const [scoreTies, setScoreTies] = useState(0);
  const [winner, setWinner] = useState("");
  const [showRestart, setShowRestart] = useState(false);
  const [isPlayWithCpu, setIsPlayWithCpu] = useState(
    pickedGameType === "cpu" ? true : false
  );

  useEffect(() => {
    setPickedPlayer(searchParams.get("player"));
    setPickedGameType(searchParams.get("vs"));
    setIsPlayWithCpu(pickedGameType === "cpu" ? true : false);
  });

  useEffect(() => {
    if (pickedPlayer !== currentPlayer && isPlayWithCpu && !isGameOver) {
      setTimeout(() => {
        pickRandomCell();
      }, 100);
      currentPlayer === "cross"
        ? setCurrentPlayer("circle")
        : setCurrentPlayer("cross");
    }
  }, [cells]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const pickRandomCell = () => {
    if (!isGameOver) {
      const newCells = [...cells];
      const emptyCellIndexes = [];
      newCells.map((newCell, index) => {
        if (newCell === "") emptyCellIndexes.push(index);
      });
      const randomNumber = Math.floor(Math.random() * emptyCellIndexes.length);
      const randomIndex = emptyCellIndexes[randomNumber];
      newCells[randomIndex] = currentPlayer;
      setCells(newCells);
    }
  };

  const checkWinner = () => {
    winningCombinations.forEach((combination) => {
      const circleWin = combination.every((id) => cells[id] === "circle");
      const crossWin = combination.every((id) => cells[id] === "cross");
      if (crossWin) {
        setIsGameOver(true);
        setWinner("cross");
        if (!isGameOver) {
          setScoreCross((prev) => prev + 1);
          combination.forEach((id) => {
            document.getElementById(id).classList.add("win");
          });
        }
      }

      if (circleWin) {
        setIsGameOver(true);
        setWinner("circle");
        if (!isGameOver) {
          setScoreCircle((prev) => prev + 1);
          combination.forEach((id) => {
            document.getElementById(id).classList.add("win");
          });
        }
      }
    });
    if (cells.indexOf("") === -1) {
      setIsGameOver(true);
      setWinner("tie");
      if (!isGameOver) {
        setScoreTies((prev) => prev + 1);
      }
    }
  };

  const restartGame = () => {
    clearCells();
    setCells(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("cross");
    setIsGameOver(false);
  };

  const clearCells = () => {
    document.querySelectorAll(".win").forEach((cell) => {
      cell.classList.remove("win");
    });
  };

  useEffect(() => {
    checkWinner();
  }, [cells]);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <img src="/assets/logo.svg" alt="logo" className="logo" />
          <div className={styles.playerTurn}>
            {currentPlayer === "cross" && (
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
                  fill="#A8A8A8"
                />
              </svg>
            )}

            {currentPlayer === "circle" && (
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill="#A8A8A8"
                />
              </svg>
            )}

            <span className="heading-xs" style={{ color: "var(--silver)" }}>
              TURN
            </span>
          </div>
          <button
            className={styles.btnRestart}
            onClick={() => setShowRestart(true)}
          >
            <img src="/assets/icon-restart.svg" alt="restart" />
          </button>
        </header>
        <div className={styles.board} data-current-player={currentPlayer}>
          {cells.map((cell, index) => (
            <Cell
              key={index}
              cell={cell}
              id={index}
              cells={cells}
              currentPlayer={currentPlayer}
              setCells={setCells}
              setCurrentPlayer={setCurrentPlayer}
              isGameOver={isGameOver}
              isPlayWithCpu={isPlayWithCpu}
              pickedPlayer={pickedPlayer}
            />
          ))}
        </div>
        <footer>
          <div>
            <p className="body">
              X (
              {pickedGameType === "cpu"
                ? pickedPlayer === "cross"
                  ? "YOU"
                  : "CPU"
                : pickedPlayer === "cross"
                ? "P1"
                : "P2"}
              )
            </p>
            <p className="heading-md">{scoreCross}</p>
          </div>
          <div>
            <p className="body">TIES</p>
            <p className="heading-md">{scoreTies}</p>
          </div>
          <div>
            <p className="body">
              O ({" "}
              {pickedGameType === "cpu"
                ? pickedPlayer === "circle"
                  ? "YOU"
                  : "CPU"
                : pickedPlayer === "circle"
                ? "P1"
                : "P2"}
              )
            </p>
            <p className="heading-md">{scoreCircle}</p>
          </div>
        </footer>
      </div>
      {isGameOver && (
        <GameOver
          restartGame={restartGame}
          winner={winner}
          pickedPlayer={pickedPlayer}
        />
      )}
      {showRestart && (
        <Restart
          restartGame={restartGame}
          showRestart={showRestart}
          setShowRestart={setShowRestart}
        />
      )}
    </>
  );
};

export default Game;
