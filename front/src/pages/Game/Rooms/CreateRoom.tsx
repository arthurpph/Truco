import  { useEffect } from "react";
import { useGameBackgroundContext } from "../../../contexts/gameBackgroundContext";

const CreateRoom = () => {
    const { backgroundColor, changeBackground } = useGameBackgroundContext();

    useEffect(() => {
        const previousBackgroundColor = backgroundColor;
        changeBackground('bg-white-transparent')

        return () => changeBackground(previousBackgroundColor);
    }, []);

    return (
        <div className="flex flex-col h-full bg-white rounded-game-border-2 select-none">
            <div className="flex items-center justify-center bg-blue h-[148px] rounded-t-game-border-2">
                <h1 className="font-open-sans-semibold font-bold text-white text-[35px] select-none">Criar Sala</h1>
            </div> 
        </div>
    );
};

export default CreateRoom;
