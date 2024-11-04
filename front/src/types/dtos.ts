export interface CreateRoomDTO {
    name: string;
    leaderName: string;
};

export interface RoomDTO {
    id: string;
    name: string;
    players: RoomPlayerDTO[];
};

export interface RoomPlayerDTO {
    id: string;
    name: string;
};