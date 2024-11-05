import  { useEffect, useState } from "react";
import { useGameBackgroundContext } from "../../../contexts/gameBackgroundContext";
import ClickButton from "../../../components/ClickButton";
import getSocketConnection from "../../../lib/SocketConnection";
import ClickDiv from "../../../components/ClickDiv";
import LeftSign from "../../../components/LeftSign";
import AnimatedPage from "../../../components/AnimatedPage";
import Rooms from "./RoomsList";

const CreateRoom = () => {
    const [roomName, setRoomName] = useState<string>('');
    const [showRooms, setShowRooms] = useState<boolean>(false);
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
        () => {
            setShowRooms(true);
        });
    }

    return (
        <>
            {!showRooms ? (
                <div className="flex flex-col h-full bg-white rounded-game-border-2 select-none">
                    <div className="relative flex items-center justify-center bg-blue h-[148px] rounded-t-game-border-2">
                        <ClickDiv onClick={() => setShowRooms(true)} defaultStyles="absolute top-0 left-0 cursor-pointer scale:100 active:scale-110">
                            <LeftSign/>
                        </ClickDiv>
                        <h1 className="font-open-sans-semibold font-bold text-white text-[35px] select-none">Criar Sala</h1>
                    </div> 
                    <div className="flex flex-col items-center justify-center h-full gap-6">
                        <input type="text" className="font-pt-sans font-normal bg-white-3 text-[25px] text-gray-500 w-[350px] h-[50px] 
                            rounded-[10px] leading-[75px] pl-[10px] border-2 border-white 
                            transition-transform duration-150 ease-linear transform focus:scale-105 focus:outline-none
                        " onChange={(event) => setRoomName(event.target.value)}/>
                        <ClickButton name="Criar" defaultStyles="animate-btsHome cursor-pointer text-[30px] font-bold bg-yellow text-purple-2 w-[350px] h-[72px] rounded-[10px] tracking-[1px] select-none uppercase active:bg-yellow-2"
                            onClick={createRoom}
                        />
                    </div>
                </div>
            ) : (
                <AnimatedPage startDirection="left">
                    <Rooms/>
                </AnimatedPage>
            )}
        </>
        
    );
};

export default CreateRoom;
