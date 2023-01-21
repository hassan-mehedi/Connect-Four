import "./App.css";
import Board from "./components/board/Board";
import Logo from "./components/logo/Logo";
import { GameContextProvider } from "./context/gameContext";

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <div className="menu">
                    <button>MENU</button>
                    <Logo />
                    <button
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        RESTART
                    </button>
                </div>
                <Board />
            </GameContextProvider>
        </div>
    );
}

export default App;
