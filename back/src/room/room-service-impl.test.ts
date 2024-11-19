import { Socket } from "socket.io";
import { CreateRoomDTO } from "../dto/create-room-dto";
import { RoomServiceImpl } from "./room-service-impl";
import { PlayerService } from "../player/player-service";
import { RoomService } from "./room-service";
import { PlayerServiceImpl } from "../player/player-service-impl";

const mockSocket = {
  id: "123",
  emit: jest.fn(),
} as any as Socket;

jest.useFakeTimers();

describe("RoomServiceImpl", () => {
  let roomService: RoomService;
  let playerService: PlayerService;

  beforeEach(() => {
    roomService = new RoomServiceImpl();
    playerService = new PlayerServiceImpl(roomService);
    roomService.setPlayerService(playerService);
  });

  test("should create a room and return its ID", () => {
    const createRoomDTO: CreateRoomDTO = {
      name: "Test Room",
      leaderName: "Leader",
    };

    const roomId = roomService.create(createRoomDTO, mockSocket);
    expect(roomId).toBeDefined();
    expect(roomService.doesRoomExist(roomId)).toBe(true);
  });

  test("should remove a room by ID", () => {
    const createRoomDTO: CreateRoomDTO = {
      name: "Room to Remove",
      leaderName: "Leader",
    };

    const roomId = roomService.create(createRoomDTO, mockSocket);
    roomService.remove(roomId);

    expect(roomService.doesRoomExist(roomId)).toBe(false);
  });

  test("should get a room by ID", () => {
    const createRoomDTO: CreateRoomDTO = {
      name: "Room to Get",
      leaderName: "Leader",
    };

    const roomId = roomService.create(createRoomDTO, mockSocket);
    const room = roomService.get(roomId);

    expect(room).not.toBeNull();
    expect(room?.name).toBe("Room to Get");
  });

  test("should return null for a non-existing room", () => {
    const room = roomService.get("non-existing-id");
    expect(room).toBeNull();
  });

  test("should throw an error if playerService is not set", () => {
    roomService = new RoomServiceImpl();

    expect(() => {
      roomService.create({ name: "Test", leaderName: "Leader" }, mockSocket);
    }).toThrow("Player service was not defined");
  });

  jest.runAllTimers();
});