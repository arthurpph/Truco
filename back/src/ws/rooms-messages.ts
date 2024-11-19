import { Socket } from "socket.io";
import { CreateRoomDTO } from "../dto/create-room-dto";
import RoomPlayer from "../room/room-player";
import { GetRoomDTO } from "../dto/get-room-dto";
import { JoinRoomDTO } from "../dto/join-room-dto";
import Room from "../room/room";
import { LeaveRoomDTO } from "../dto/leave-room-dto";
import { RoomPlayerRequestDTO } from "../dto/room-player-dto";
import { RoomService } from "../room/room-service";
import { PlayerService } from "../player/player-service";
import { RoomServiceImpl } from "../room/room-service-impl";
import { PlayerServiceImpl } from "../player/player-service-impl";

const roomService: RoomService = new RoomServiceImpl();
const playerService: PlayerService = new PlayerServiceImpl(roomService);
roomService.setPlayerService(playerService);

const roomsMessages = (socket: Socket): void => {
    socket.on('getRoom', (data: GetRoomDTO): void => {
        const room = roomService.get(data.id);
        socket.emit('roomInfo', room ? room.toDTO() : { error: 'Room not found' });
    });

    socket.on('getRooms', (): void => {
        const roomsArray = [...roomService.getAll()];
        socket.emit('roomList', roomsArray.map(room => room.toDTO()));
    });

    socket.on('createRoom', (data: CreateRoomDTO): void => {
        // if(RoomService.isPlayerInARoom())

        const id: string = roomService.create(data, socket);

        socket.emit("roomCreated", roomService.get(id)?.toDTO());
    });

    socket.on('joinRoom', (data: JoinRoomDTO): void => {
        const roomId = data.roomId;
        const room: Room | null = roomService.get(roomId);

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

        playerService.create(new RoomPlayer(data.playerName, socket), roomId);

        socket.emit("joinedRoom", room.toDTO());
    });

    socket.on('leaveRoom', (data: LeaveRoomDTO): void => {
        const roomId = data.roomId;
        const doesRoomExist: boolean = roomService.doesRoomExist(roomId);

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

        playerService.remove(data.playerName, roomId);

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
        const room: Room | null = playerService.getRoomFromPlayerName(data.name);

        if(!room) {
            socket.emit("error", {
                message: "Player provided is not in a room",
            });
            return;
        }

        playerService.toggleReadyState(playerName, room.id);
    });
};

export default roomsMessages;
