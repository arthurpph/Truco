import { Socket } from "socket.io";
import { CreateRoomDTO } from "../dto/create-room-dto";
import Room from "./room";
import { PlayerService } from "../player/player-service";

export interface RoomService {
    create(room: CreateRoomDTO, socket: Socket) : string;
    remove(roomId: string): void;
    get(roomId: string): Room | null;
    getAll(): Set<Room>;
    doesRoomExist(roomId: string): boolean;
    setPlayerService(playerService: PlayerService): void;
}