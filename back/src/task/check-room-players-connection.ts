import { PlayerService } from "../player/player-service";
import Room from "../room/room";

const checkRoomPlayersConnection = (room: Room, playerService: PlayerService) => {
    if(room.getNumberOfPlayers() === 0) {
        return;
    }

    for(const player of room.getPlayers()) {
        player.socket.emit("connectionTest");

        const timeout = setTimeout(() => {
            playerService.remove(player.name, room.id);
        }, 2000);

        player.socket.once("connectionReceived", () => {
            clearTimeout(timeout);
        });
    }

    setTimeout(() => checkRoomPlayersConnection(room, playerService), 10000);
}

export default checkRoomPlayersConnection;