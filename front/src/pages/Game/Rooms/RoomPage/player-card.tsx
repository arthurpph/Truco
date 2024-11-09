import { Player } from "../../../../types/models";

const PlayerCard = ({ player, index }: { player: Player | null, index: number }) => (
    <div className={`flex flex-col items-center justify-center gap-[20px] ${index % 2 == 0 ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`w-[160px] h-[160px] rounded-full`}
        style={{
          backgroundImage: player
            ? "url('/src/assets/playerimage.png')"
            : "url('/src/assets/avatarvazio.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: "3px solid",
          borderColor: "gray",
        }}
      >
      </div>
    </div>
);

export default PlayerCard;