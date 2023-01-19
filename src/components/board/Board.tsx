import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/gameContext";

import Circles from "../circle/Circles";

export default function Board() {
    const { circleData, setCircleData } = useContext(GameContext);

    return (
        <div className="grid grid-cols-7 gap-2">
            {circleData.map((row, index) => {
                return <Circles key={index} row={row} />;
            })}
        </div>
    );
}
