import { useContext } from "react";
import { CircleType } from "../../utility/utility";
import { GameContext } from "../../context/gameContext";

type CircleProps = {
    item: CircleType;
};

export default function Circle({ item }: CircleProps) {
    const { handleCircleClick } = useContext(GameContext);
    return (
        <button className="cursor-pointer hover:bg-slate-400" onClick={event => handleCircleClick(event, item)}>
            <p className={`${item.active ? "bg-green-600" : "bg-yellow-600"}`}>Circle</p>
        </button>
    );
}
