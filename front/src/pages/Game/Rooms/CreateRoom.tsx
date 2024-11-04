import  { useEffect, useState } from "react";
import { useGameBackgroundContext } from "../../../contexts/gameBackgroundContext";
import ClickButton from "../../../components/ClickButton";
import getSocketConnection from "../../../lib/SocketConnection";

const CreateRoom = () => {
    const [roomName, setRoomName] = useState<string>('');
    const { backgroundColor, changeBackground, username } = useGameBackgroundContext();
    const socket = getSocketConnection();

    useEffect(() => {
        const previousBackgroundColor = backgroundColor;
        changeBackground('bg-white-transparent')

        return () => changeBackground(previousBackgroundColor);
    }, []);

    const createRoom = () => {
        if(roomName == '') {
            return;
        }

        socket.createRoom({
            name: roomName,
            leaderName: username
        },
        () => {});
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-game-border-2 select-none">
            <div className="flex items-center justify-center bg-blue h-[148px] rounded-t-game-border-2">
                <h1 className="font-open-sans-semibold font-bold text-white text-[35px] select-none">Criar Sala</h1>
            </div> 
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <input type="text" className="font-pt-sans font-normal bg-white-3 text-[32px] text-white w-[350px] h-[50px] 
                    rounded-[10px] leading-[75px] pl-[10px] border-2 border-white 
                    transition-transform duration-150 ease-linear transform focus:scale-105 focus:outline-none
                " onChange={(event) => setRoomName(event.target.value)}/>
                <ClickButton name="Criar" defaultStyles="animate-btsHome cursor-pointer text-[30px] font-bold bg-yellow text-purple-2 w-[350px] h-[72px] rounded-[10px] tracking-[1px] select-none uppercase active:bg-yellow-2"
                    onClick={createRoom}
                />
            </div>
        </div>
    );
};

export default CreateRoom;
