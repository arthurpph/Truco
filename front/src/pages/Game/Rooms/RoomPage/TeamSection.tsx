import { Team } from "../../../../types/models";
import PlayerCard from "./PlayerCard";

const TeamSection = ({ team }: { team: Team }) => (
    <div className="flex items-center justify-center bg-white w-full h-[28%] gap-[140px]">
        {team.players.map((player, index) => (
            <div key={index} className="flex w-[300px] justify-between items-center">
                {index % 2 === 0 && player && <div>aaaa</div>}
                <PlayerCard player={player} index={index}/>
                {index % 2 === 1 && player && <div>aaaa</div>}
            </div>
        ))}
    </div>
);

export default TeamSection;