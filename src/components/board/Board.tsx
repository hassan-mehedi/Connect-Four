import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/gameContext";

export default function Board() {
    const [isLoading, setIsLoading] = useState(true);
    const gameContext = useContext(GameContext);

    useEffect(() => {
        if (gameContext) {
            setIsLoading(false);
        }
    }, [gameContext]);

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        console.log(gameContext);
    }

    return <div></div>;
}
