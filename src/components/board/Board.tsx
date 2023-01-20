import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/gameContext";

import Circles from "../circle/Circles";
import Counter from "../counter/Counter";
import "./board.style.css";

export default function Board() {
    const { circleData, setCircleData, firstPlayerTurn, secondPlayerTurn } = useContext(GameContext);

    return (
        <div className="board">
            <div className="flex flex-col gap-4">
                {circleData.map((row, index) => {
                    return <Circles key={index} row={row} />;
                })}
            </div>
            <div className="counter">
                <Counter />
            </div>
        </div>
    );
}
