import { v4 as uuidv4 } from "uuid";
import RoomPlayer from "./RoomPlayer";
import { RoomDTO } from "../dtos/RoomDTO";

class Room {
    private static ids: string[] = [];
    private id: string;
    private name: string;
    private players: Set<RoomPlayer>;

    constructor(name: string, leader: RoomPlayer) {
        this.id = Room.generateId();
        Room.ids.push(this.id);
        this.name = name;
        this.players = new Set();
        this.players.add(leader);
    }

    private static generateId(): string {
        let id: string = uuidv4();
        while(Room.ids.includes(id)) {
            id = uuidv4();
        }
        return id;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPlayers(): Set<RoomPlayer> {
        return this.players;
    }

    public removePlayer(playerName: string) {
        const playerToRemove = Array.from(this.players).find(player => player.getName() === playerName);

        if(!playerToRemove) {
            throw new Error(`Jogador ${playerName} não encontrado na sala`);
        }

        this.players.delete(playerToRemove);
    }

    public toDTO(): RoomDTO {
        return {
            id: this.id,
            name: this.name,
            players: [...this.players].map(player => player.toDTO())
        };
    } 
}

export default Room;