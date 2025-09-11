// Import types and components for the Quiz Summary component
import type { QuizSummary as QuizSummaryType } from "../types";
import ImageButton from "../../../components/ImageButton";
import HomeButton from "../../../assets/buttons/HomeButton.png";

// Interface defining the props for the QuizSummary component
interface QuizSummaryProps {
    score: number;              // Final score achieved by the user
    elapsedTime: number;        // Time taken to complete the quiz
    summary: QuizSummaryType[]; // Array of question results with answers
    onGoHome: () => void;       // Callback function to navigate back to home
    savingProgress: boolean;    // Flag indicating if progress is being saved
}

// Main QuizSummary component that displays quiz results
export const QuizSummary = ({
  score,
  elapsedTime,
  summary,
  onGoHome,
  savingProgress,
}: QuizSummaryProps) => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
      {/* Quiz summary title */}
      <h2 className="text-white font-game text-3xl text-center">
        Quiz Summary
      </h2>
      
      {/* Main content container with glassmorphism effect */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full">
        {/* Score and time display section */}
        <div className="text-center mb-6">
          <p className="text-white font-game text-2xl">
            Total Score: {score}
          </p>
          <p className="text-white font-sourceCodeFont text-lg">
            Time: {elapsedTime} seconds
          </p>
          
          {/* Conditional message based on score */}
          {score < 0 ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-red-400 font-game text-lg mt-2">
                Careful! The virus is fighting back — you lost {Math.abs(score)} points.
              </p>
            </div>
          ) : score > 0 ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-green-400 font-game text-lg mt-2">
                Nice! You just earned +{score} points!
              </p>
            </div>
          ) : null}
        </div>

        {/* Scrollable container for individual question results */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Map through each question result and display details */}
          {summary.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                item.isCorrect ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              {/* Display the question text */}
              <p className="text-white font-game text-sm mb-2">
                {item.question}
              </p>
              {/* Display user's answer */}
              <p className="text-white font-sourceCodeFont text-xs">
                Your answer: {item.userAnswer}
              </p>
              {/* Display correct answer */}
              <p className="text-white font-sourceCodeFont text-xs">
                Correct answer: {item.correctAnswer}
              </p>
              {/* Display result status and points earned */}
              <p
                className={`font-sourceCodeFont text-xs font-bold ${
                  item.isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.isCorrect ? "Correct" : "Incorrect"} (Points: {item.points})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Home button to navigate back to main menu */}
      <ImageButton
        image={HomeButton}
        onClick={onGoHome}
        disabled={savingProgress}
        className="w-[200px] h-[60px]"
      />
      
      {/* Loading indicator when saving progress */}
      {savingProgress && (
        <p className="text-white font-sourceCodeFont text-sm">
          Saving progress...
        </p>
      )}
    </div>
  );
};
