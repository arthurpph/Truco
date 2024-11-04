import { useEffect, useState } from "react";
import ClickButton from "../../../components/ClickButton";
import getSocketConnection from "../../../lib/SocketConnection";
import { Room } from "../../../types/models";
import CreateRoom from "./CreateRoom";
import AnimatedPage from "../../../components/AnimatedPage";

const Rooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [showCreateRoomScreen, setShowCreateRoomScreen] = useState<boolean>(false);

    const requestRoomList = () => {
        const socket = getSocketConnection();
        socket.requestRoomList((data: Room[]) => {
            setRooms(data);
        });
    }

    useEffect(() => {
        requestRoomList();

        const interval = setInterval(requestRoomList, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {!showCreateRoomScreen ? (
                <div className="flex flex-col h-full rounded-game-border select-none">
                    <div className="flex items-center justify-center bg-orange-3 h-[148px] rounded-t-game-border-2">
                        <h1 className="font-open-sans-semibold font-bold text-white text-[35px] select-none">Salas</h1>
                    </div>
                    <div className="bg-white-2 flex justify-between h-full rounded-b-game-border-2 gap-10">
                        <div className="bg-white flex flex-col items-center justify-center gap-8 w-[280px] h-[93%] mt-5 ml-5 rounded-game-border border-[3px] border-[#ff5700]">
                            <p className="text-[30px] text-purple font-semibold select-none">Salas Criadas</p>
                            <ClickButton name="Criar Sala" defaultStyles="bg-green w-[210px] h-[71px] rounded-game-border select-none font-extrabold text-[25px] text-white cursor-pointer uppercase active:scale-105 active:bg-green-2"
                                onClick={() => setShowCreateRoomScreen(true)}
                            />
                        </div>
                        <div className="w-[76%] h-full max-h-[600px] flex flex-wrap content-start overflow-auto mt-[20px] custom-scroll">
                            {rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <div key={room.id} className="flex flex-col items-center bg-white w-[229px] h-[240px] mr-[30px] mt-[10px] rounded-game-border border-gray-300 active:border-2">
                                        <h2 className="text-[25px] text-purple font-bold mt-2">{room.name}</h2>
                                        <div className="flex items-center justify-center w-full h-full">
                                            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                                                <div className="bg-[url('/src/assets/avatarvazio.png')] bg-cover bg-no-repeat bg-center w-[76px] h-[76px] border-2 border-gray-400 rounded-full"></div>
                                                <div className="bg-[url('/src/assets/avatarvazio.png')] bg-cover bg-no-repeat bg-center w-[76px] h-[76px] border-2 border-gray-400 rounded-full"></div>
                                            </div>
                                            <span className="text-center text-gray-400 text-[25px]">VS</span>
                                            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                                                <div className="bg-[url('/src/assets/avatarvazio.png')] bg-cover bg-no-repeat bg-center w-[76px] h-[76px] border-2 border-gray-400 rounded-full"></div>
                                                <div className="bg-[url('/src/assets/avatarvazio.png')] bg-cover bg-no-repeat bg-center w-[76px] h-[76px] border-2 border-gray-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="w-[80%] h-[85%] flex items-center justify-center">
                                    <p className="text-[25px] text-center text-gray-500">Nenhuma sala criada ainda.</p>
                                </div>
                            )} 
                        </div>
                    </div>
                </div>
            ) : (
                <AnimatedPage>
                    <CreateRoom/> 
                </AnimatedPage>
            )}
            
        </>
   );
};

export default Rooms;