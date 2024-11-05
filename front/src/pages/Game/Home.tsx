import { useEffect, useState } from "react";
import ClickButton from "../../components/ClickButton";
import Rooms from "./Rooms/RoomsList";
import AnimatedPage from "../../components/AnimatedPage";
import { useGameBackgroundContext } from "../../contexts/gameBackgroundContext";

const Home = () => {
    const [showRoomsComponent, setShowRoomsComponent] = useState(false);
    const { username, setUsername, setBackgroundColor } = useGameBackgroundContext();

    useEffect(() => {
        setUsername('');
        setBackgroundColor('bg-orange')
    }, [])

    const play = (): void => {
        if(username == '') {
            return;
        }

        setShowRoomsComponent(true);
    }

    return (
        <>
            {!showRoomsComponent ? (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <label className="w-55 h-[72px] relative flex items-center">
                            {/* <span className="absolute left-3 top-3 text-white text-[18px] z-10 before:content-['\\e61a']"></span> */}
                            <input type="text" className="font-pt-sans font-normal bg-orange-2 text-[32px] text-white w-full h-full 
                                rounded-[10px] leading-[75px] m-auto p-0 px-2.5 pl-[55px] border border-white 
                                transition-transform duration-150 ease-linear transform focus:scale-105 focus:outline-none"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </label>
                        <ClickButton name="Jogar" defaultStyles="animate-btsHome cursor-pointer text-[30px] font-bold bg-yellow text-purple-2 w-full h-[72px] rounded-[10px] tracking-[1px] select-none uppercase active:bg-yellow-2"
                        onClick={play}/>
                    </div>
                </div>
            ) : (
                <AnimatedPage startDirection="right">
                    <Rooms/> 
                </AnimatedPage>
            )}
        </>
    );
}

export default Home;