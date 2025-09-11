import { useUserData } from "..";
import pillYellow from "../../../assets/imgs/pillYellow.png";
import pillBlue from "../../../assets/imgs/pillBlue.png";

type UserData = {
  name: string;
  score: number;
  visited_booths?: any[];
};

export default function UserInfo() {
  const { data, isLoading, isError } = useUserData();
  
  //handling of errors using TanStack 
  if (isLoading) return <p className="text-white font-game text-xl">Loading...</p>;
  if (isError || !data || typeof data.name !== "string" || typeof data.score !== "number") {
    return <p className="text-red-500 font-game">Error loading user data</p>;
  }

  const { name, score, visited_booths = [] } = data as UserData;

  return (
    <div className="absolute top-0 left-0 z-20 p-6">
      {/* Greeting */}
      <div className="relative text-center">
        <p className="text-[#37E4B9] font-Game text-[28px] absolute bottom-[3.5px] font-normal">
          Hi, {name}!
        </p>
        <p className="text-white font-Game text-[28px] font-normal">Hi, {name}!</p>
      </div>

      

      {/* Points Section */}
      <div className="mb-4">
        <p className="text-white font-Game text-xl mb-2">Points</p>
        <div 
          className="w-32 h-16 bg-no-repeat bg-center bg-contain flex items-center justify-center"
          style={{ backgroundImage: `url(${pillYellow})` }}
        >
          <p className="text-[#15054E] font-sourceCodeFont text-3xl font-bold">
            {score}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <p className="text-white font-Game text-xl mb-2">Progress</p>
        <div 
          className="w-32 h-16 bg-no-repeat bg-center bg-contain flex items-center justify-center"
          style={{ backgroundImage: `url(${pillBlue})` }}
        >
          <p className="text-[#15054E] font-sourceCodeFont text-3xl font-bold">
            {visited_booths.length}/10
          </p>
        </div>
      </div>
    </div>
  );
}