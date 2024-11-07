export interface Player {
    id: string;
    name: string;
    isReady: boolean;
};

export interface Team {
    id: string;
    players: [Player, Player];
}

export interface Room {
    id: string;
    name: string;
    teams: [Team, Team]
};