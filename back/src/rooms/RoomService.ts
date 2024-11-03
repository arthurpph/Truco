import Room from "./Room";
import RoomPlayer from "./RoomPlayer";

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

    public isPlayerInARoom(player: RoomPlayer): boolean {
        const player_id: string = player.getId();

        for(const room of this.rooms) {

            const players = room.getPlayers();

            for(const roomPlayer of players) {

                if(roomPlayer.getId() === player_id) {
                    return true;
                }

            }
        }

        return false;
    }
}

export default new RoomService();