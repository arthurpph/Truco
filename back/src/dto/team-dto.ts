import { RoomPlayerResponseDTO } from "./room-player-dto";

export interface TeamDTO {
    id: string;
    players: RoomPlayerResponseDTO[];
};