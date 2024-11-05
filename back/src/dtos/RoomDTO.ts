import { TeamDTO } from "./TeamDTO";

export interface RoomDTO {
    id: string;
    name: string;
    teams: [TeamDTO, TeamDTO];
};