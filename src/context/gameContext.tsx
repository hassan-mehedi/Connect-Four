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
    minutes: number;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    winner: string | null;
    setWinner: React.Dispatch<React.SetStateAction<string | null>>;
};

type GameContextProviderProps = {
    children: React.ReactNode;
};

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [circleData, setCircleData] = useState<CircleType[][]>(circleArray);
    const [firstPlayerTurn, SetFirstPlayerTurn] = useState(true);
    const [secondPlayerTurn, SetSecondPlayerTurn] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [steps, setSteps] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);

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
        setMinutes(0);
        setSeconds(30);
        setSteps(steps + 1);

        checkWinner(item);
    };

    // Check the winner of the game after each turn
    const checkWinner = (item: CircleType) => {
        const player = firstPlayerTurn ? "PLAYER 1" : "PLAYER 2";
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

        let leftRowWinningCheck =
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

        let rightRowWinningCheck =
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

        let middleFirstRowWinningCheck =
            column >= 1 &&
            column <= 4 &&
            circleData[row][column - 1].active &&
            circleData[row][column - 1].firstPerson === firstPerson &&
            circleData[row][column - 1].secondPerson === secondPerson &&
            circleData[row][column + 1].active &&
            circleData[row][column + 1].firstPerson === firstPerson &&
            circleData[row][column + 1].secondPerson === secondPerson &&
            circleData[row][column + 2].active &&
            circleData[row][column + 2].firstPerson === firstPerson &&
            circleData[row][column + 2].secondPerson === secondPerson;

        let middleSecondRowWinningCheck =
            column >= 2 &&
            column <= 5 &&
            circleData[row][column - 1].active &&
            circleData[row][column - 1].firstPerson === firstPerson &&
            circleData[row][column - 1].secondPerson === secondPerson &&
            circleData[row][column - 2].active &&
            circleData[row][column - 2].firstPerson === firstPerson &&
            circleData[row][column - 2].secondPerson === secondPerson &&
            circleData[row][column + 1].active &&
            circleData[row][column + 1].firstPerson === firstPerson &&
            circleData[row][column + 1].secondPerson === secondPerson;

        let topToBottomColumnWinningCheck =
            row <= 2 &&
            circleData[row + 1][column].active &&
            circleData[row + 1][column].firstPerson === firstPerson &&
            circleData[row + 1][column].secondPerson === secondPerson &&
            circleData[row + 2][column].active &&
            circleData[row + 2][column].firstPerson === firstPerson &&
            circleData[row + 2][column].secondPerson === secondPerson &&
            circleData[row + 3][column].active &&
            circleData[row + 3][column].firstPerson === firstPerson &&
            circleData[row + 3][column].secondPerson === secondPerson;

        let topToBottomLeftCornerWinningCheck =
            row <= 2 &&
            column >= 3 &&
            circleData[row + 1][column - 1].active &&
            circleData[row + 1][column - 1].firstPerson === firstPerson &&
            circleData[row + 1][column - 1].secondPerson === secondPerson &&
            circleData[row + 2][column - 2].active &&
            circleData[row + 2][column - 2].firstPerson === firstPerson &&
            circleData[row + 2][column - 2].secondPerson === secondPerson &&
            circleData[row + 3][column - 3].active &&
            circleData[row + 3][column - 3].firstPerson === firstPerson &&
            circleData[row + 3][column - 3].secondPerson === secondPerson;

        let middleFirstLeftCornerWinningCheck =
            row >= 2 &&
            row <= 4 &&
            column >= 2 &&
            column <= 5 &&
            circleData[row + 1][column + 1].active &&
            circleData[row + 1][column + 1].firstPerson === firstPerson &&
            circleData[row + 1][column + 1].secondPerson === secondPerson &&
            circleData[row - 1][column - 1].active &&
            circleData[row - 1][column - 1].firstPerson === firstPerson &&
            circleData[row - 1][column - 1].secondPerson === secondPerson &&
            circleData[row - 2][column - 2].active &&
            circleData[row - 2][column - 2].firstPerson === firstPerson &&
            circleData[row - 2][column - 2].secondPerson === secondPerson;

        let middleSecondLeftCornerWinningCheck =
            row >= 1 &&
            row <= 3 &&
            column >= 1 &&
            column <= 4 &&
            circleData[row - 1][column - 1].active &&
            circleData[row - 1][column - 1].firstPerson === firstPerson &&
            circleData[row - 1][column - 1].secondPerson === secondPerson &&
            circleData[row + 1][column + 1].active &&
            circleData[row + 1][column + 1].firstPerson === firstPerson &&
            circleData[row + 1][column + 1].secondPerson === secondPerson &&
            circleData[row + 2][column + 2].active &&
            circleData[row + 2][column + 2].firstPerson === firstPerson &&
            circleData[row + 2][column + 2].secondPerson === secondPerson;

        let bottomToTopLeftCornerWinningCheck =
            row >= 3 &&
            column >= 3 &&
            circleData[row - 1][column - 1].active &&
            circleData[row - 1][column - 1].firstPerson === firstPerson &&
            circleData[row - 1][column - 1].secondPerson === secondPerson &&
            circleData[row - 2][column - 2].active &&
            circleData[row - 2][column - 2].firstPerson === firstPerson &&
            circleData[row - 2][column - 2].secondPerson === secondPerson &&
            circleData[row - 3][column - 3].active &&
            circleData[row - 3][column - 3].firstPerson === firstPerson &&
            circleData[row - 3][column - 3].secondPerson === secondPerson;

        let topToBottomRightCornerWinningCheck =
            row <= 2 &&
            column <= 3 &&
            circleData[row + 1][column + 1].active &&
            circleData[row + 1][column + 1].firstPerson === firstPerson &&
            circleData[row + 1][column + 1].secondPerson === secondPerson &&
            circleData[row + 2][column + 2].active &&
            circleData[row + 2][column + 2].firstPerson === firstPerson &&
            circleData[row + 2][column + 2].secondPerson === secondPerson &&
            circleData[row + 3][column + 3].active &&
            circleData[row + 3][column + 3].firstPerson === firstPerson &&
            circleData[row + 3][column + 3].secondPerson === secondPerson;

        let bottomToTopRightCornerWinningCheck =
            row >= 3 &&
            column <= 3 &&
            circleData[row - 1][column + 1].active &&
            circleData[row - 1][column + 1].firstPerson === firstPerson &&
            circleData[row - 1][column + 1].secondPerson === secondPerson &&
            circleData[row - 2][column + 2].active &&
            circleData[row - 2][column + 2].firstPerson === firstPerson &&
            circleData[row - 2][column + 2].secondPerson === secondPerson &&
            circleData[row - 3][column + 3].active &&
            circleData[row - 3][column + 3].firstPerson === firstPerson &&
            circleData[row - 3][column + 3].secondPerson === secondPerson;

        let middleFirstRightCornerWinningCheck =
            row >= 2 &&
            row <= 4 &&
            column >= 1 &&
            column <= 4 &&
            circleData[row + 1][column - 1].active &&
            circleData[row + 1][column - 1].firstPerson === firstPerson &&
            circleData[row + 1][column - 1].secondPerson === secondPerson &&
            circleData[row - 1][column + 1].active &&
            circleData[row - 1][column + 1].firstPerson === firstPerson &&
            circleData[row - 1][column + 1].secondPerson === secondPerson &&
            circleData[row - 2][column + 2].active &&
            circleData[row - 2][column + 2].firstPerson === firstPerson &&
            circleData[row - 2][column + 2].secondPerson === secondPerson;

        let middleSecondRightCornerWinningCheck =
            row >= 1 &&
            row <= 3 &&
            column >= 2 &&
            column <= 5 &&
            circleData[row + 1][column - 1].active &&
            circleData[row + 1][column - 1].firstPerson === firstPerson &&
            circleData[row + 1][column - 1].secondPerson === secondPerson &&
            circleData[row + 2][column - 2].active &&
            circleData[row + 2][column - 2].firstPerson === firstPerson &&
            circleData[row + 2][column - 2].secondPerson === secondPerson &&
            circleData[row - 1][column + 1].active &&
            circleData[row - 1][column + 1].firstPerson === firstPerson &&
            circleData[row - 1][column + 1].secondPerson === secondPerson;

        if (
            leftRowWinningCheck ||
            rightRowWinningCheck ||
            middleFirstRowWinningCheck ||
            middleSecondRowWinningCheck ||
            topToBottomColumnWinningCheck ||
            topToBottomLeftCornerWinningCheck ||
            topToBottomRightCornerWinningCheck ||
            bottomToTopLeftCornerWinningCheck ||
            bottomToTopRightCornerWinningCheck ||
            middleFirstLeftCornerWinningCheck ||
            middleSecondLeftCornerWinningCheck ||
            middleFirstRightCornerWinningCheck ||
            middleSecondRightCornerWinningCheck
        ) {
            setWinner(player);
            setCircleData(circleArray);
        } else if (steps >= 41) {
            setWinner("Draw");
            setCircleData(circleArray);
        }
    };

    return (
        <GameContext.Provider
            value={{
                circleData,
                setCircleData,
                firstPlayerTurn,
                SetFirstPlayerTurn,
                secondPlayerTurn,
                SetSecondPlayerTurn,
                handleCircleClick,
                minutes,
                setMinutes,
                seconds,
                setSeconds,
                winner,
                setWinner,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
