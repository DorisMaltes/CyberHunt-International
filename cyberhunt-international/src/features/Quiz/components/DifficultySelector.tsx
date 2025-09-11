import EasyButton from "../../../assets/buttons/Easy_Button.png";
import HardButton from "../../../assets/buttons/Hard_Button.png";
import ImageButton from "../../../components/ImageButton";
import type { DifficultyType } from "../types";

//components imports 
import ModalQuestion from "../../home/components/ModalQuestion";

interface DifficultySelectorProps {
    onSelectDifficulty: (difficulty: DifficultyType) => void;
    loading?: boolean;
}

export const DifficultySelector = ({ onSelectDifficulty, loading }: DifficultySelectorProps) => {
    return (
        <div className="flex flex-col items-center gap-6">
        <p className="text-white font-game text-xl text-center">
            Select difficulty:
        </p>
        
        <div className="flex flex-col gap-4">
            <ImageButton
            image={EasyButton}
            onClick={() => onSelectDifficulty("easy")}
            disabled={loading}
            className="w-[280px] h-[76px]"
            />
            
            <ImageButton
            image={HardButton}
            onClick={() => onSelectDifficulty("hard")}
            disabled={loading}
            className="w-[280px] h-[76px]"
            />
        </div>

        <div className="pt-10">
            <ModalQuestion
            title="What difficulty to choose?"
            description="Correct answers to easy questions earn 5 points, while incorrect answers deduct 2 points.

Hard questions earn 10 points, while incorrect answers deduct 5 points. "
            />
        </div>
        
        {loading && (
            <p className="text-white font-sourceCodeFont text-lg">
            Loading questions...
            </p>
        )}
        </div>
    );
};
