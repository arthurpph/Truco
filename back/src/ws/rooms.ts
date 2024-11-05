import { Socket } from "socket.io";
import RoomService from "../rooms/RoomService";
import { CreateRoomDTO } from "../dtos/create-room-dto";
import RoomPlayer from "../rooms/room-player";

const rooms = (socket: Socket) => {
    socket.on('getRooms', () => {
        const roomsArray = [...RoomService.getRooms()];
        socket.emit('roomList', roomsArray.map(room => room.toDTO()));
    });

    socket.on('createRoom', (data: CreateRoomDTO) => {
        // if(RoomService.isPlayerInARoom())

        const id: string = RoomService.addRoom(data.name, new RoomPlayer(data.leaderName, socket));

        socket.emit("roomCreated", RoomService.getRoom(id)?.toDTO());
    });
};

export default rooms;
