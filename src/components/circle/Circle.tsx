import { useContext } from "react";
import { CircleType } from "../../utility/utility";
import { GameContext } from "../../context/gameContext";

type CircleProps = {
    item: CircleType;
};

export default function Circle({ item }: CircleProps) {
    const { handleCircleClick } = useContext(GameContext);
    return (
        <button
            className={`cursor-pointer ${
                item.firstPerson ? "bg-red-500" : item.secondPerson ? "bg-yellow-500" : "bg-violet-600"
            } w-12 h-12 rounded-full`}
            onClick={event => handleCircleClick(event, item)}
            style={{ borderTop: "8px solid black", borderBottom: "2px solid black", borderRight: "2px solid black", borderLeft: "2px solid black" }}
        ></button>
    );
}
