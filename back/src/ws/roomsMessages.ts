import { Socket } from "socket.io";
import RoomService from "../rooms/room-service";
import { CreateRoomDTO } from "../dtos/create-room-dto";
import RoomPlayer from "../rooms/room-player";
import { GetRoomDTO } from "../dtos/get-room-dto";
import { JoinRoomDTO } from "../dtos/join-room-dto";
import Room from "../rooms/room";
import { LeaveRoomDTO } from "../dtos/leave-room-dto";

const roomsMessages = (socket: Socket): void => {
    socket.on('getRoom', (data: GetRoomDTO): void => {
        const room = RoomService.getRoom(data.id);
        socket.emit('roomInfo', room ? room.toDTO() : { error: 'Room not found' });
    });

    socket.on('getRooms', (): void => {
        const roomsArray = [...RoomService.getRooms()];
        socket.emit('roomList', roomsArray.map(room => room.toDTO()));
    });

    socket.on('createRoom', (data: CreateRoomDTO): void => {
        // if(RoomService.isPlayerInARoom())

        const id: string = RoomService.addRoom(data.name, new RoomPlayer(data.leaderName, socket));

        socket.emit("roomCreated", RoomService.getRoom(id)?.toDTO());
    });

    socket.on('joinRoom', (data: JoinRoomDTO): void => {
        const room: Room | null = RoomService.getRoom(data.roomId);

        if(!room) {
            socket.emit("error", {
                message: "Room with the roomId provided does not exist",
            });
            return;
        }

        if(!data.playerName) {
            socket.emit("error", {
                message: "playerName cannot be null",
            });
            return;
        }

        room.addPlayer(new RoomPlayer(data.playerName, socket));

        socket.emit("joinedRoom", room);
    });

    socket.on('leaveRoom', (data: LeaveRoomDTO): void => {
        const roomId = data.roomId;
        const doesRoomExist: boolean = RoomService.doesRoomExist(roomId);

        if(!doesRoomExist) {
            socket.emit("error", {
                message: "Room with the roomId provided does not exist",
            });
            return;
        }

        if(!data.playerName) {
            socket.emit("error", {
                message: "playerName cannot be null",
            });
            return;
        }

        RoomService.removePlayer(data.playerName, roomId);

        socket.emit("leftRoom");
    });
};

export default roomsMessages;
