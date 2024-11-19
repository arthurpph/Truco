import RoomPlayer from "./room-player";
import { RoomDTO } from "../dto/room-dto";
import Team from "../team/team";
import constants from '../data/constants.json';
import { v4 as uuidv4 } from "uuid";
import checkRoomPlayersConnection from "../task/check-room-players-connection";

class Room {
    id: string;
    name: string;
    teams: Team[]; // array size is set dynamically on the constructor based on constants.TEAM_MAX_PLAYERS
    isActive: boolean;

    constructor(name: string, leader: RoomPlayer) {
        this.id = uuidv4();
        this.name = name;
        this.teams = Array.from({ length: constants.TEAM_MAX_PLAYERS }, () => new Team());
        this.isActive = true;
        this.addPlayer(leader);
    }

    public addPlayer(player: RoomPlayer): void {
        for(const team of this.teams) 
        {
            if(team.getPlayers().size < constants.TEAM_MAX_PLAYERS) 
            {
                team.addPlayer(player);
                return;
            }
        }

        throw new Error("Room is already full");
    }

    public removePlayer(playerName: string): void {
        const playerInfo: { team: Team, player: RoomPlayer } | undefined = this.findPlayer(playerName);

        if(!playerInfo) {
            throw new Error(`Jogador ${playerName} não encontrado na sala`);
        }

        playerInfo.team.removePlayer(playerInfo?.player);
    }

    public getPlayers(): RoomPlayer[] {
        const players: RoomPlayer[] = [];

        this.teams.forEach(team => {
            team.getPlayers().forEach(player => {
                players.push(player);
            });
        });

        return players;
    }

    public findPlayer(playerName: string): { team: Team, player: RoomPlayer } | undefined {
        for (const team of this.teams) {
            const player = Array.from(team.getPlayers()).find(player => player.name === playerName);
            if (player) {
                return {
                    team,
                    player,
                };  
            }
        }

        return undefined; 
    }

    public getNumberOfPlayers(): number {
        return this.teams.reduce((count, team) => count + team.getPlayers().size, 0);
    }

    public toDTO(): RoomDTO {
        const [team1, team2] = this.teams.map(team => team.toDTO());
        return {
            id: this.id,
            name: this.name,
            teams: [team1, team2],
        };
    } 

    public deactivate(): void {
        this.isActive = false;
    }
}

export default Room;