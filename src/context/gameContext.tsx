import React, { createContext, useState } from "react";
import { CircleType, circleArray } from "../utility/utility";

export type GameContextType = {
    circleData: CircleType[][];
    setCircleData: React.Dispatch<React.SetStateAction<CircleType[][]>>;
    handleCircleClick: (event: React.MouseEvent<HTMLButtonElement>, item: CircleType) => void;
};

type GameContextProviderProps = {
    children: React.ReactNode;
};

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [circleData, setCircleData] = useState<CircleType[][]>(circleArray);
    const [playerTurn, SetPlayerTurn] = useState(1);

    const handleCircleClick = (event: React.MouseEvent<HTMLButtonElement>, item: CircleType) => {
        let tempCircleData = [...circleData];
        tempCircleData[item.row][item.column] = { ...item, active: true };

        setCircleData(tempCircleData);
    };

    return <GameContext.Provider value={{ circleData, setCircleData, handleCircleClick }}>{children}</GameContext.Provider>;
};
