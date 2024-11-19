import { Socket } from "socket.io";
import { CreateRoomDTO } from "../dto/create-room-dto";
import Room from "./room";
import RoomPlayer from "./room-player";
import checkRoomPlayersConnection from "../task/check-room-players-connection";
import { RoomService } from "./room-service";
import { PlayerService } from "../player/player-service";

export class RoomServiceImpl implements RoomService {
    private rooms: Set<Room>;
    private playerService: PlayerService | null;

    constructor() {
        this.rooms = new Set();
        this.playerService = null;
    }

    public create(room: CreateRoomDTO, socket: Socket): string {
        if(!this.playerService) {
            throw new Error("Player service was not defined");
        }

        // TODO: check if player is in a room before creating new room
        // if (this.isPlayerInARoom(leader)) {
        //     throw new Error("O jogador já está em uma sala");
        // }

        const player = new RoomPlayer(room.leaderName, socket);
        const newRoom: Room = new Room(room.name, player);
        this.rooms.add(newRoom);
        setTimeout(() => checkRoomPlayersConnection(newRoom, this.playerService as PlayerService), 10000);

        return newRoom.id;
    }

    public remove(roomId: string): void {
        for(const room of this.rooms) {
            if(room.id === roomId) {
                this.rooms.delete(room);
                return;
            }
        }
    }

    public get(roomId: string): Room | null {
        for(const room of this.rooms) {
            if(room.id === roomId) {
                return room;
            }
        }

        return null;
    }

    public getAll(): Set<Room> {
        return this.rooms;
    }

    public doesRoomExist(roomId: string): boolean {
        return this.get(roomId) != null;
    }

    public setPlayerService(playerService: PlayerService): void {
        this.playerService = playerService;
    }
}