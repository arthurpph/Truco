import { createContext, useContext } from "react";

interface GameBackgroundContextType {
    backgroundColor: string;
    changeBackground: (color: string) => void;
    username: string;
    changeUsername: (username: string) => void;
};

export const GameBackgroundContext = createContext<GameBackgroundContextType | undefined>(undefined);

export const useGameBackgroundContext = () => {
    const context = useContext(GameBackgroundContext);

    if (!context) {
        throw new Error("useGameBackgroundContext must be used within a GameBackgroundProvider");
    }

    return context;
};
