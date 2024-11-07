import { Socket } from "socket.io";
import RoomService from "../rooms/room-service";
import { CreateRoomDTO } from "../dtos/create-room-dto";
import RoomPlayer from "../rooms/room-player";
import { GetRoomDTO } from "../dtos/get-room-dto";
import { JoinRoomDTO } from "../dtos/join-room-dto";
import Room from "../rooms/room";
import { LeaveRoomDTO } from "../dtos/leave-room-dto";
import { RoomPlayerRequestDTO } from "../dtos/room-player-dto";

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
        const roomId = data.roomId;
        const room: Room | null = RoomService.getRoom(roomId);

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

        RoomService.addPlayer(new RoomPlayer(data.playerName, socket), roomId);

        socket.emit("joinedRoom", room.toDTO());
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

    socket.on('toggleIsReady', (data: RoomPlayerRequestDTO): void => {
        if(!data.name) {
            socket.emit("error", {
                message: "Player name cannot be null",
            });
            return;
        }

        const playerName: string = data.name;
        const room: Room | null = RoomService.getRoomFromPlayerName(data.name);

        if(!room) {
            socket.emit("error", {
                message: "Player provided is not in a room",
            });
            return;
        }

        RoomService.toggleIsReady(playerName, room.getId());
    });
};

export default roomsMessages;
