import React, { createContext, useState } from "react";
import { CircleType } from "../utility/utility";

type GameContextType = {
    circleData: CircleType[][] | null;
    setCircleData: React.Dispatch<React.SetStateAction<CircleType[][] | null>>;
};

type GameContextProviderProps = {
    children: React.ReactNode;
};

export const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [circleData, setCircleData] = useState<CircleType[][] | null>(null);

    return <GameContext.Provider value={{ circleData, setCircleData }}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
