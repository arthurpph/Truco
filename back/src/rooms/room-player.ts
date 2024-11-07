import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import { RoomPlayerResponseDTO } from "../dtos/room-player-dto";

class RoomPlayer {
    private static generateId(): string {
        let id: string = uuidv4();
        while(RoomPlayer.IDS.includes(id)) {
            id = uuidv4();
        }
        return id;
    }

    private static IDS: string[] = [];

    private id: string;
    private name: string;
    private isReady: boolean;
    private socket: Socket;

    constructor(name: string, socket: Socket) {
        this.id = RoomPlayer.generateId();
        RoomPlayer.IDS.push(this.id);
        this.name = name;
        this.isReady = false;
        this.socket = socket;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getIsReady(): boolean {
        return this.isReady;
    }

    public getSocket(): Socket {
        return this.socket;
    }

    public toggleIsReady(): void {
        this.isReady = !this.isReady;
    }

    public toDTO(): RoomPlayerResponseDTO {
        return {
            id: this.id,
            name: this.name,
            isReady: this.isReady,
        };
    }
}

export default RoomPlayer;