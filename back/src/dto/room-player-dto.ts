export class RoomPlayerRequestDTO {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class RoomPlayerResponseDTO {
    id: string;
    name: string;
    isReady: boolean;

    constructor(id: string, name: string, isReady: boolean) {
        this.id = id;
        this.name = name;
        this.isReady = isReady;
    }
}