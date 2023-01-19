import React, { createContext, useState } from "react";
import { CircleType, circleArray } from "../utility/utility";

export type GameContextType = {
    circleData: CircleType[][];
    setCircleData: React.Dispatch<React.SetStateAction<CircleType[][]>>;
    firstPlayerTurn: boolean;
    SetFirstPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
    secondPlayerTurn: boolean;
    SetSecondPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
    handleCircleClick: (event: React.MouseEvent<HTMLButtonElement>, item: CircleType) => void;
};

type GameContextProviderProps = {
    children: React.ReactNode;
};

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [circleData, setCircleData] = useState<CircleType[][]>(circleArray);
    const [firstPlayerTurn, SetFirstPlayerTurn] = useState(true);
    const [secondPlayerTurn, SetSecondPlayerTurn] = useState(false);

    const handleCircleClick = (event: React.MouseEvent<HTMLButtonElement>, item: CircleType) => {
        // Conditions
        let isActive = item.active;
        let validCircleForClick = item.row !== 5 && circleData[item.row + 1][item.column].active === false;

        // Return if the circle is already active
        if (isActive) {
            return;
        }
        // Return if the circle is not in the bottom and there is no circle below it
        if (validCircleForClick) {
            return;
        }

        let tempCircleData = [...circleData];
        tempCircleData[item.row][item.column] = { ...item, active: true, firstPerson: firstPlayerTurn, secondPerson: secondPlayerTurn };

        SetFirstPlayerTurn(!firstPlayerTurn);
        SetSecondPlayerTurn(!secondPlayerTurn);
        setCircleData(tempCircleData);

        checkWinner(item);
    };

    const checkWinner = (item: CircleType) => {
        const player = firstPlayerTurn ? "First Player" : "Second Player";
        let { row, column, firstPerson, secondPerson, active } = item;

        if (firstPlayerTurn) {
            firstPerson = true;
            secondPerson = false;
            active = true;
        } else if (secondPlayerTurn) {
            firstPerson = false;
            secondPerson = true;
            active = true;
        }

        let leftWinningCheck =
            column >= 3 &&
            circleData[row][column - 1].active &&
            circleData[row][column - 1].firstPerson === firstPerson &&
            circleData[row][column - 1].secondPerson === secondPerson &&
            circleData[row][column - 2].active &&
            circleData[row][column - 2].firstPerson === firstPerson &&
            circleData[row][column - 2].secondPerson === secondPerson &&
            circleData[row][column - 3].active &&
            circleData[row][column - 3].firstPerson === firstPerson &&
            circleData[row][column - 3].secondPerson === secondPerson;

        let rightWinningCheck =
            column <= 3 &&
            circleData[row][column + 1].active &&
            circleData[row][column + 1].firstPerson === firstPerson &&
            circleData[row][column + 1].secondPerson === secondPerson &&
            circleData[row][column + 2].active &&
            circleData[row][column + 2].firstPerson === firstPerson &&
            circleData[row][column + 2].secondPerson === secondPerson &&
            circleData[row][column + 3].active &&
            circleData[row][column + 3].firstPerson === firstPerson &&
            circleData[row][column + 3].secondPerson === secondPerson;

        if (leftWinningCheck || rightWinningCheck) {
            console.log(player + " Win");
        }
    };

    return (
        <GameContext.Provider
            value={{ circleData, setCircleData, firstPlayerTurn, SetFirstPlayerTurn, secondPlayerTurn, SetSecondPlayerTurn, handleCircleClick }}
        >
            {children}
        </GameContext.Provider>
    );
};
