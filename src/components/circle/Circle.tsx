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
            className={`circle ${item.firstPerson ? "bg-red-500" : item.secondPerson ? "bg-yellow-500" : "bg-violet-600"} `}
            onClick={event => handleCircleClick(event, item)}
        ></button>
    );
}
