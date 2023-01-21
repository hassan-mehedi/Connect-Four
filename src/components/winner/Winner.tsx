import { useContext } from "react";
import { GameContext } from "../../context/gameContext";

export default function Winner() {
    const { winner, setWinner } = useContext(GameContext);
    return (
        <div className="winner">
            <p>{winner}</p>
            <h1>WINS</h1>
            <button
                onClick={() => {
                    setWinner(null);
                    window.location.reload();
                }}
            >
                PLAY AGAIN
            </button>
        </div>
    );
}
