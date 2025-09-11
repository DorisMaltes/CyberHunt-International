import type { ProgressData } from "../types";
import ImageButton from "../../../components/ImageButton";
import HomeButton from "../../../assets/buttons/HomeButton.png";

interface AlreadyCompletedProps {
  progressData: ProgressData;
  onGoHome: () => void;
}

export const AlreadyCompleted = ({ progressData, onGoHome }: AlreadyCompletedProps) => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
      <h2 className="text-white font-game text-3xl text-center">
        Booth Already Completed
      </h2>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full text-center">
        <p className="text-white font-game text-xl mb-4">
          You've already completed this booth!
        </p>
        
        <div className="space-y-2">
          <p className="text-white font-sourceCodeFont text-lg">
            Points obtained: {progressData.score_obtained}
          </p>
          <p className="text-white font-sourceCodeFont text-lg">
            Time taken: {progressData.time_taken} seconds
          </p>
        </div>
      </div>

      <ImageButton
        image={HomeButton}
        onClick={onGoHome}
        className="w-[200px] h-[60px]"
      />
    </div>
  );
};
