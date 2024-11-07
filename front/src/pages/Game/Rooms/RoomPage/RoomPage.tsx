import React, { useEffect, useState } from "react";
import { useGameBackgroundContext } from "../../../../contexts/gameBackgroundContext";
import getSocketConnection from "../../../../lib/SocketConnection";
import { Room } from "../../../../types/models";
import TeamSection from "./TeamSection";
import { AnimatePresence } from "framer-motion";
import ClickDiv from "../../../../components/ClickDiv";
import LeftSign from "../../../../components/LeftSign";
import AnimatedPage from "../../../../components/AnimatedPage";
import RoomsList from "../RoomsList";

interface RoomPageProps {
    roomId: string | undefined;
};

const RoomPage: React.FC<RoomPageProps> = ({ roomId }) => {
    const [showRoomsList, setShowRoomsList] = useState<boolean>(false);

    const [roomData, setRoomData] = useState<Room | null>(null);

    const { username, setBackgroundColor, setDefaultBackgroundColor } = useGameBackgroundContext();
    const socket = getSocketConnection();

    const fetchRoomData = (): void => {
        if(!roomId) {
            throw new Error("roomId cannot be undefined");
        }

        socket.requestRoomInfo({ id: roomId }, (data: Room) => {
            setRoomData(data);
        });
    }

    const handleBackToRoomsList = (roomId: string | null): void => {
        if(!roomId) {
            setShowRoomsList(true);
            return;
        }

        leaveRoom(roomId);
    }

    const leaveRoom = (roomId: string) => {
        socket.leaveRoom({
            roomId,
            playerName: username,
        }, () => {
            setShowRoomsList(true);
        });
    }

    useEffect(() => {
        setBackgroundColor('white');
        fetchRoomData();

        return () => {
            setDefaultBackgroundColor();
        }
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {showRoomsList ? (
                    <AnimatedPage key="home" startDirection="left">
                        <RoomsList/>
                    </AnimatedPage>
                ) : (
                    <AnimatedPage key="room-page" startDirection="right">
                        {!roomData ? (
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="relative bg-blue w-full h-[13%] flex items-center justify-center rounded-t-game-border-2">
                                    <ClickDiv onClick={() => handleBackToRoomsList(roomData)} defaultStyles="absolute top-0 left-0 cursor-pointer scale:100 active:scale-110">
                                        <LeftSign/>
                                    </ClickDiv>
                                </div>
                                <div>
                                    Sala especificada não existe
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="relative bg-blue w-full h-[13%] text-[45px] text-white flex items-center justify-center rounded-t-game-border-2">
                                    <ClickDiv onClick={() => handleBackToRoomsList(roomData.id)} defaultStyles="absolute top-0 left-0 cursor-pointer scale:100 active:scale-110">
                                        <LeftSign/>
                                    </ClickDiv>
                                    <h2>{roomData.name}</h2>
                                </div>
                                <TeamSection team={roomData.teams[0]} />
                                <TeamSection team={roomData.teams[1]} />
                                <div className="bg-white-2 w-full h-[34%]">
                                </div>
                            </div>
                        )}
                    </AnimatedPage>
                )}
            </AnimatePresence>
        </>
    );
};

export default RoomPage;