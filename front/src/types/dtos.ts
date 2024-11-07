export interface CreateRoomDTO {
    name: string;
    leaderName: string;
};

export interface TeamDTO {
    players: [RoomPlayerDTO, RoomPlayerDTO];
}

export interface RoomDTO {
    id: string;
    name: string;
    teams: [TeamDTO, TeamDTO];
};

export interface RoomPlayerDTO {
    id: string;
    name: string;
};

export interface JoinRoomDTO {
    roomId: string;
    playerName: string;
};

export interface LeaveRoomDTO {
    roomId: string;
    playerName: string;
};