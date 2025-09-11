// assets imports
import YellowCard from "../../../assets/imgs/YellowCardComponent.png";

// logic imports
import { useLeaderboardData } from "../hooks/useLeaderBoardData";

export default function LeaderBoardContainer() {
  const { data, isLoading, isError } = useLeaderboardData();

  
  if (isLoading) return <p className="text-white">Loading leaderboard...</p>;
  if (isError || !data) return <p className="text-red-500">Error loading leaderboard</p>;

  const { players, userId, userRank } = data;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-fit h-fit">
        <img src={YellowCard} alt="Yellow Card" className="w-full h-auto pb-2" />

        <div className="absolute inset-0 flex justify-center items-center m-10 flex-col pb-7">
          <div className="bg-white h-full w-full overflow-y-auto p-4 rounded-lg">
            <ol className="text-[#7920FF] list-decimal font-sourceCodeFont text-xl">
              {players.map((player: any, index: number) => {
                const isCurrentUser = player.id === userId;

                return (
                  <li
                    key={player.id}
                    className={`mb-1 ${isCurrentUser ? "font-bold text-[#C88D00]" : ""} list-none`}
                  >
                    {index + 1}. {player.name || "Player"} — {player.score || 0} pts
                    {index === 0 && " 👑"}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Show User's Ranking if they are outside of the top 5 */}
        {userRank && userRank > 5 && (
          <div className="mt-4 text-center bg-white rounded-lg px-4 py-2 text-[#7920FF] font-sourceCodeFont">
            🔍 Your position: {userRank}°
          </div>
        )}
      </div>
    </div>
  );
}
