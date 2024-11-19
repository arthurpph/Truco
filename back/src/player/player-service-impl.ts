import { RoomDTO } from "../dto/room-dto";
import { RoomService } from "../room/room-service";
import Room from "../room/room";
import RoomPlayer from "../room/room-player";
import { PlayerService } from "./player-service";

export class PlayerServiceImpl implements PlayerService {
    constructor(private readonly roomService: RoomService) {}

    public create(player: RoomPlayer, roomId: string): void {
        const room = this.roomService.get(roomId);

        if(!room) {
            throw new Error("Room with the id provided does not exist");
        }

        if(room.getNumberOfPlayers() >= 4) {
            return;
        }

        room.addPlayer(player);

        this.updatePlayersRoomData(room, player.id);
    }

    public remove(playerName: string, roomId: string): void {
        const room: Room | null = this.roomService.get(roomId);

        if (!room) {
            throw new Error(`Sala com o especificado roomId não encontrada.`);
        }

        room.removePlayer(playerName);

        if(room.getNumberOfPlayers() == 0) {
            this.roomService.remove(room.id);
            return;
        }

        this.updatePlayersRoomData(room);
    }

    public toggleReadyState(playerName: string, roomId: string): void {
        const room: Room | null = this.roomService.get(roomId);

        if(!room) {
            throw new Error("Sala não encontrada.");
        }

        const player: RoomPlayer | null = this.getPlayerFromPlayerName(playerName);

        if(!player) {
            throw new Error("Jogador não encontrado");
        }

        player.toggleIsReady();

        if(room.getNumberOfPlayers() === 4 && room.getPlayers().every(player => player.isReady)) {
            this.sendGameStartedMessage(room);
            return;
        }

        this.updatePlayersRoomData(room);
    }

    public getRoomFromPlayerName(playerName: string): Room | null {
        if(!this.isPlayerInARoom) {
            return null;
        }

        for(const room of this.roomService.getAll()) {
            const players = room.getPlayers();

            for(const roomPlayer of players) {
                if(roomPlayer.name === playerName) {
                    return room;
                }
            } 
        }

        return null;
    }

    public getPlayerFromPlayerName(playerName: string): RoomPlayer | null {
        const playerRoom: Room | null = this.getRoomFromPlayerName(playerName);

        if(!playerRoom) {
            return null;
        }

        const player: RoomPlayer | undefined = playerRoom.getPlayers().find(player => player.name === playerName);
        
        if(!player) {
            return null;
        }
        
        return player;
    }

    public isPlayerInARoom(playerName: string): boolean {
        for(const room of this.roomService.getAll()) {
            const players = room.getPlayers();

            for(const roomPlayer of players) {
                if(roomPlayer.name === playerName) {
                    return true;
                }
            }
        }

        return false;
    }

    private updatePlayersRoomData(room: Room, excludedPlayerId?: string): void {
        const roomDataUpdatedDTO: RoomDTO = room.toDTO();

        room.getPlayers().forEach(roomPlayer => {
            if(excludedPlayerId && roomPlayer.id === excludedPlayerId) {
                return;
            }

            roomPlayer.socket.emit("roomDataUpdated", roomDataUpdatedDTO);
        });
    }

    private sendGameStartedMessage(room: Room): void {
        for(const player of room.getPlayers()) {
            player.socket.emit("gameStarted");
        }
    }
}