import "./App.css";
import Board from "./components/board/Board";
import { GameContextProvider } from "./context/gameContext";

function App() {
    return (
        <div className="App">
            <GameContextProvider>
                <Board />
            </GameContextProvider>
        </div>
    );
}

export default App;
