import React from "react";

type RulesPorpsType = {
    setShowRules: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Rules({ setShowRules }: RulesPorpsType) {
    return (
        <div className="rules">
            <div className="rules-group">
                <h1>Objective</h1>
                <ol>
                    <li>To be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally)</li>
                </ol>
                <h1>Rules</h1>
                <ol>
                    <li>Players must alternate turns, and only one disc can be dropped in each turn. </li>
                    <li>On your turn, drop one of your colored discs from the top into any of the seven slots. </li>
                    <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
                    <li>The starter of the previous game goes second on the next game.</li>
                </ol>
            </div>
            <button
                className="rules-button bg-red-500"
                onClick={() => {
                    setShowRules(false);
                }}
            >
                OK
            </button>
        </div>
    );
}
