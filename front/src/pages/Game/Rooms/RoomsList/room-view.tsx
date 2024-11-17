import { useGameBackgroundContext } from "../../../../contexts/game-context";
import getSocketConnection from "../../../../lib/socket-connection";
import { Room, ShowRoomInfo } from "../../../../types/models";

interface RoomProps {
    room: Room;
    setShowRoom: React.Dispatch<React.SetStateAction<ShowRoomInfo>>;
};

const RoomView = ({ room, setShowRoom }: RoomProps) => {
    const { username } = useGameBackgroundContext();
    const socket = getSocketConnection();

    const handleRoomClick = (roomId: string) => {
        socket.joinRoom({
            roomId,
            playerName: username, 
        }, (room) => {
            setShowRoom({ show: true, roomId: room.id });
        });
    }

    return (
        <div onClick={() => handleRoomClick(room.id)} key={room.id} className="flex flex-col items-center bg-white w-[229px] h-[240px] mr-[30px] mt-[10px] rounded-game-border border-gray-300 active:border-2">
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
    );
}

export default RoomView;