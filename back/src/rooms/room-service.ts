import { RoomDTO } from "../dtos/room-dto";
import Room from "./room";
import RoomPlayer from "./room-player";

class RoomService {
    private rooms: Set<Room>;

    constructor() {
        this.rooms = new Set();
    }

    public addRoom(name: string, leader: RoomPlayer): string {
        // if (this.isPlayerInARoom(leader)) {
        //     throw new Error("O jogador já está em uma sala");
        // }

        const newRoom: Room = new Room(name, leader);
        this.rooms.add(newRoom);
        return newRoom.getId();
    }

    public removeRoom(roomId: string): void {
        for(const room of this.rooms) {
            
            if(room.getId() === roomId) {
                this.rooms.delete(room);
                return;
            }

        }
    }

    public getRoom(roomId: string): Room | null {
        for(const room of this.rooms) {

            if(room.getId() === roomId) {
                return room;
            }

        }

        return null;
    }

    public getRooms(): Set<Room> {
        return this.rooms;
    }

    public addPlayer(player: RoomPlayer, roomId: string): void {
        const room = this.getRoom(roomId);

        if(!room) {
            throw new Error("Room with the id provided does not exist");
        }

        if(room.getNumberOfPlayers() >= 4) {
            return;
        }

        room.addPlayer(player);

        this.updatePlayersRoomData(room, player.getId());
    }

    public removePlayer(playerName: string, roomId: string): void {
        const room: Room | null = this.getRoom(roomId);

        if (!room) {
            throw new Error(`Sala com o especificado roomId não encontrada.`);
        }

        room.removePlayer(playerName);

        if(room.getNumberOfPlayers() == 0) {
            this.rooms.delete(room);
            return;
        }

        this.updatePlayersRoomData(room);
    }

    public getRoomFromPlayerName(playerName: string): Room | null {
        if(!this.isPlayerInARoom) {
            return null;
        }

        for(const room of this.rooms) {
            const players = room.getPlayers();

            for(const roomPlayer of players) {

                if(roomPlayer.getName() === playerName) {
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

        const player: RoomPlayer | undefined = playerRoom.getPlayers().find(player => player.getName() === playerName);
        
        if(!player) {
            return null;
        }
        
        return player;
    }

    public toggleIsReady(playerName: string, roomId: string): void {
        const room: Room | null = this.getRoom(roomId);

        if(!room) {
            throw new Error("Sala não encontrada.");
        }

        const player: RoomPlayer | null = this.getPlayerFromPlayerName(playerName);

        if(!player) {
            throw new Error("Jogador não encontrado");
        }

        player.toggleIsReady();

        if(room.getNumberOfPlayers() === 4 && room.getPlayers().every(player => player.getIsReady())) {
            this.sendGameStartedMessage(room);
            return;
        }

        this.updatePlayersRoomData(room);
    }

    public isPlayerInARoom(playerName: string): boolean {
        for(const room of this.rooms) {

            const players = room.getPlayers();

            for(const roomPlayer of players) {

                if(roomPlayer.getName() === playerName) {
                    return true;
                }

            }
        }

        return false;
    }

    public doesRoomExist(roomId: string): boolean {
        return this.getRoom(roomId) != null;
    }

    private updatePlayersRoomData(room: Room, excludedPlayerId?: string): void {
        const roomDataUpdatedDTO: RoomDTO = room.toDTO();

        room.getPlayers().forEach(roomPlayer => {
            if(excludedPlayerId && roomPlayer.getId() === excludedPlayerId) {
                return;
            }

            roomPlayer.getSocket().emit("roomDataUpdated", roomDataUpdatedDTO);
        });
    }

    private sendGameStartedMessage(room: Room): void {
        for(const player of room.getPlayers()) {
            player.getSocket().emit("gameStarted");
        }
    }
}

export default new RoomService();