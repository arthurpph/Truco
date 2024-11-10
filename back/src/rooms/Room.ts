import { v4 as uuidv4 } from "uuid";
import RoomPlayer from "./room-player";
import { RoomDTO } from "../dtos/room-dto";
import Team from "./team";
import constants from '../data/constants.json';
import roomService from "./room-service";

class Room {
    private checkPlayersConnection(): void {
        if(this.getNumberOfPlayers() === 0) {
            // the room was deleted and if the timeout continues it will generate a memory leak here
            return;
        }

        const players: RoomPlayer[] = this.getPlayers();

        for(const player of players) {
            player.getSocket().emit("connectionTest");

            const timeout = setTimeout(() => {
                roomService.removePlayer(player.getName(), this.id);
            }, 2000);

            player.getSocket().once("connectionReceived", () => {
                clearTimeout(timeout);
            });
        }

        setTimeout(this.checkPlayersConnection.bind(this), 10000);
    }

    private static generateId(): string {
        let id: string = uuidv4();
        while(Room.IDS.includes(id)) {
            id = uuidv4();
        }
        return id;
    }

    private static IDS: string[] = [];

    private id: string;
    private name: string;
    private teams: Team[]; // array size is set dynamically on the constructor based on constants.TEAM_MAX_PLAYERS

    constructor(name: string, leader: RoomPlayer) {
        this.id = Room.generateId();
        Room.IDS.push(this.id);
        this.name = name;
        this.teams = Array.from({ length: constants.TEAM_MAX_PLAYERS }, () => new Team());
        this.addPlayer(leader);
        setTimeout(this.checkPlayersConnection.bind(this), 10000);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getTeams(): Team[] {
        return this.teams;
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
            const player = Array.from(team.getPlayers()).find(player => player.getName() === playerName);
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
        let numberOfPlayers: number = 0;

        this.teams.forEach(team => {
            numberOfPlayers += team.getPlayers().size;
        });

        return numberOfPlayers;
    }

    public toDTO(): RoomDTO {
        const [team1, team2] = this.teams.map(team => team.toDTO());
        return {
            id: this.id,
            name: this.name,
            teams: [team1, team2],
        };
    } 
}

export default Room;