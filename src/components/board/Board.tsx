import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/gameContext";

import Circles from "../circle/Circles";

export default function Board() {
    const { circleData, setCircleData, firstPlayerTurn, secondPlayerTurn } = useContext(GameContext);

    return (
        <div>
            {firstPlayerTurn && <p className="m-10">First Player Turn</p>}
            {secondPlayerTurn && <p className="m-10">Second Player Turn</p>}
            <div className="flex flex-col gap-4">
                {circleData.map((row, index) => {
                    return <Circles key={index} row={row} />;
                })}
            </div>
        </div>
    );
}
