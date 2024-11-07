import { useEffect, useState } from "react";
import Home from "./Home";
import { GameBackgroundContext } from "../../contexts/gameBackgroundContext";
import constants from "../../data/constants.json";

const Game = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>(constants.DEFAULT_GAME_BACKGROUND_COLOR);
    const [username, setUsername] = useState<string>('');

    const setDefaultBackgroundColor = () => {
        setBackgroundColor(constants.DEFAULT_GAME_BACKGROUND_COLOR);
    }

    useEffect(() => {
        document.body.classList.add("bg-purple", "bg-purple-gradient", "h-screen", "bg-default-size");

        return () => {
            document.body.classList.remove("bg-purple", "bg-purple-gradient", "h-screen", "bg-default-size");
        };
    }, []);

    return (
        <GameBackgroundContext.Provider value={{ backgroundColor, setBackgroundColor, setDefaultBackgroundColor, username, setUsername }}>
            <div className="flex items-center justify-center h-full">
                <div style={{ overflow: "hidden" }} className={`font-pt-sans ${backgroundColor} w-[1400px] h-[768px] border-4 border-[rgba(255,255,255,0.6)] rounded-game-border shadow-[0_9px_0_rgba(0,0,0,0.26)]`}>
                    <Home/>
                </div>
            </div>
        </GameBackgroundContext.Provider>
    );
}

export default Game;