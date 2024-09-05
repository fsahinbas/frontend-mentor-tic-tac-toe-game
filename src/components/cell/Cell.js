import styles from "./cell.module.css";
const Cell = ({
  cells,
  setCells,
  cell,
  currentPlayer,
  setCurrentPlayer,
  index,
  id,
  isGameOver,
  isPlayWithCpu,
  pickedPlayer,
}) => {
  const handleClick = async (e) => {
    if (!isGameOver) {
      if (isPlayWithCpu) {
        if (pickedPlayer === currentPlayer) {
          const newCells = [...cells];
          if (newCells[id] === "") newCells[id] = currentPlayer;
          setCells(newCells);
          currentPlayer === "cross"
            ? setCurrentPlayer("circle")
            : setCurrentPlayer("cross");
        }
      } else {
        const newCells = [...cells];
        if (newCells[id] === "") newCells[id] = currentPlayer;
        setCells(newCells);
        currentPlayer === "cross"
          ? setCurrentPlayer("circle")
          : setCurrentPlayer("cross");
      }
    }
  };
  return (
    <div className={styles.cell} onClick={handleClick} id={id}>
      {cell === "cross" && (
        <img src="/assets/icon-x.svg" alt="cross" className="selected" />
      )}
      {cell === "circle" && (
        <img src="/assets/icon-o.svg" alt="circle" className="selected" />
      )}
    </div>
  );
};

export default Cell;
