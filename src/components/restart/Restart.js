import { Link } from "react-router-dom";
import styles from "./restart.module.css";
const Restart = ({ restartGame, showRestart, setShowRestart }) => {
  const handleCancel = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <p
          className="heading-lg"
          style={{ color: "var(--silver)", textTransform: "uppercase" }}
        >
          restart game?
        </p>
      </div>
      <footer className={styles.footer}>
        <button
          className={styles.btnQuit}
          onClick={() => setShowRestart(false)}
        >
          no, cancel
        </button>
        <Link to="/">
          <button className={styles.btnNext}>yes, restart</button>
        </Link>
      </footer>
    </div>
  );
};

export default Restart;
