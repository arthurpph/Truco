import { useEffect } from "react";
import Home from "./Home";

const Game = () => {
    useEffect(() => {
        document.body.classList.add("bg-purple", "bg-purple-gradient", "h-screen", "bg-default-size");

        return () => {
            document.body.classList.remove("bg-purple", "bg-purple-gradient", "h-screen", "bg-default-size");
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex items-center justify-center font-pt-sans bg-orange w-[1400px] h-[768px] border-4 border-[rgba(255,255,255,0.6)] rounded-[11px] shadow-[0_9px_0_rgba(0,0,0,0.26)] p-4">
                <Home/>
            </div>
        </div>
    );
}

export default Game;