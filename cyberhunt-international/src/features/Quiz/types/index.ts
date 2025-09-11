export type DifficultyType = "easy" | "hard";

export interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  points_correct: number;
  points_incorrect: number;
}

export interface BoothData {
  id: string;
  type: string;
  name?: string;
  description?: string;
}

export interface ProgressData {
  booth_id: string;
  score_obtained: number;
  time_taken: number;
  visited: boolean;
}

export interface QuizSummary {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
}

export interface QuizState {
  boothData: BoothData | null;
  difficulty: DifficultyType | null;
  questions: Question[];
  loadingQuestions: boolean;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  showSummary: boolean;
  score: number;
  summary: QuizSummary[];
  startTime: number | null;
  elapsedTime: number;
  quizFinished: boolean;
  progressData: ProgressData | null;
}
