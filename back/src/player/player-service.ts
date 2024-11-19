import Room from "../room/room";
import RoomPlayer from "../room/room-player";

export interface PlayerService {
    create(player: RoomPlayer, roomId: string): void;
    remove(playerName: string, roomId: string): void;
    toggleReadyState(playerName: string, roomId: string): void;
    getRoomFromPlayerName(playerName: string): Room | null;
    getPlayerFromPlayerName(playerName: string): RoomPlayer | null;
    isPlayerInARoom(playerName: string): boolean;
}