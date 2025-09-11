import clock from "../../../assets/imgs/clock.png";

interface QuizTimerProps {
  elapsedTime: number;
}

export const QuizTimer = ({ elapsedTime }: QuizTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <img src={clock} alt="clock" className="w-6 h-6" />
      <span className="text-white font-game text-xl">
        {formatTime(elapsedTime)}
      </span>
    </div>
  );
};
