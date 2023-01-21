import React, { useState } from "react";
import "./App.css";

import Menu from "./components/menu/Menu";
import Board from "./components/board/Board";
import Rules from "./components/rules/Rules";
import Logo from "./components/logo/Logo";

import { GameContextProvider } from "./context/gameContext";

function App() {
    const [startGame, setStartGame] = useState(true);
    const [showRules, setShowRules] = useState(false);
    return (
        <div className="App">
            <GameContextProvider>
                {!startGame && !showRules ? (
                    <React.Fragment>
                        <Menu setStartGame={setStartGame} setShowRules={setShowRules} />
                    </React.Fragment>
                ) : !startGame && showRules ? (
                    <Rules setShowRules={setShowRules} />
                ) : (
                    <React.Fragment>
                        <div className="options">
                            <Logo />
                            <button
                                onClick={() => {
                                    setStartGame(false);
                                    setShowRules(false);
                                }}
                            >
                                MENU
                            </button>
                        </div>
                        <Board />
                    </React.Fragment>
                )}
            </GameContextProvider>
        </div>
    );
}

export default App;
