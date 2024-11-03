import { RoomPlayerDTO } from "./RoomPlayerDTO";

export interface RoomDTO {
    id: string;
    name: string;
    players: RoomPlayerDTO[];
};