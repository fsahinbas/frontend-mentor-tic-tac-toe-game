import { Link } from "react-router-dom";
import styles from "./gameOver.module.css";
const GameOver = ({ restartGame, winner, pickedPlayer }) => {
  return (
    <div className={styles.container}>
      <header>
        {winner !== "tie" && (
          <p
            className="heading-xs"
            style={{ color: "var(--silver)", textTransform: "uppercase" }}
          >
            {winner === pickedPlayer ? "Player 1 WINS!" : "Player 2 WINS!"}{" "}
          </p>
        )}
      </header>
      <div className={styles.body}>
        {winner === "cross" && <img src="/assets/icon-x.svg" />}
        {winner === "circle" && <img src="/assets/icon-o.svg" />}
        <p
          className="heading-lg"
          style={{
            color:
              winner === "circle"
                ? "var(--light-yellow)"
                : winner === "cross"
                ? "var(--light-blue)"
                : "var(--silver)",
            textTransform: "uppercase",
          }}
        >
          {winner !== "tie" && <span>takes the round</span>}
          {winner === "tie" && <span>round tied</span>}
        </p>
      </div>
      <footer className={styles.footer}>
        <Link to="/">
          <button className={styles.btnQuit}>QUIT</button>
        </Link>
        <button className={styles.btnNext} onClick={restartGame}>
          NEXT ROUND
        </button>
      </footer>
    </div>
  );
};

export default GameOver;
