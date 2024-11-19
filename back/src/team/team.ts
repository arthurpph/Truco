import { v4 as uuidv4 } from "uuid";
import RoomPlayer from "../room/room-player";
import { TeamDTO } from "../dto/team-dto";
import constants from '../data/constants.json';

class Team {
    private id: string;
    private players: Set<RoomPlayer>;

    constructor() {
        this.id = uuidv4();
        this.players = new Set();
    }

    public addPlayer(player: RoomPlayer): void {
        if(this.players.size >= constants.TEAM_MAX_PLAYERS) {
            throw new Error("Team is already full");
        }

        this.players.add(player);
    }

    public removePlayer(player: RoomPlayer): void {
        if(!this.players.has(player)) {
            throw new Error("Player is not in the team");
        }

        this.players.delete(player);
    }

    public getPlayers(): Set<RoomPlayer> {
        return this.players;
    }

    public toDTO(): TeamDTO {
        const [player1, player2] = [...this.players].map(player => player.toDTO());
 
        return {
            id: this.id,
            players: [player1, player2],
        }
    }
}

export default Team;