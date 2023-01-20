import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/gameContext";
import "./counter.style.css";

export default function Counter() {
    const { firstPlayerTurn, secondPlayerTurn, SetFirstPlayerTurn, SetSecondPlayerTurn, minutes, setMinutes, seconds, setSeconds } =
        useContext(GameContext);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    SetFirstPlayerTurn(!firstPlayerTurn);
                    SetSecondPlayerTurn(!secondPlayerTurn);
                    setMinutes(0);
                    setSeconds(30);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div className="counter">
            <p style={{ fontSize: "14px" }}>{firstPlayerTurn ? "PLAYER 1" : "PLAYER 2"}'S TURN</p>

            {<h1 style={{ fontSize: "32px" }}>{seconds < 10 ? `0${seconds}` : seconds}s</h1>}
        </div>
    );
}
