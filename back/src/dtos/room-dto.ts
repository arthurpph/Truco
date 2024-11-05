import { TeamDTO } from "./team-dto";

export interface RoomDTO {
    id: string;
    name: string;
    teams: [TeamDTO, TeamDTO];
};