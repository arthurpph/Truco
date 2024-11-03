import RoomService from "../rooms/RoomService";

const inactiveCount = new Set();

export const emptyRoomCheck = () => {
    for(const room of RoomService.getRooms()) {

        const roomId = room.getId();

        if(room.getPlayers().size > 0) {
            return;
        }

        if(!inactiveCount.has(roomId)) {
            inactiveCount.add(roomId);
            return;
        }

        RoomService.removeRoom(roomId);
        inactiveCount.delete(roomId);
    }
};