import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import { RoomPlayerResponseDTO } from "../dto/room-player-dto";

class RoomPlayer {
    id: string;
    isReady: boolean;

    constructor(readonly name: string, readonly socket: Socket) {
        this.id = uuidv4();
        this.isReady = false;
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