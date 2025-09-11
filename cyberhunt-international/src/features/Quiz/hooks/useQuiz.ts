import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { 
  fetchBoothData, 
  fetchUserProgress, 
  fetchQuestions, 
  saveProgressToFirestore 
} from "../api/quizApi";
import type { 
  QuizState, 
  DifficultyType, 
  Question, 
  QuizSummary 
} from "../types";

export const useQuiz = (boothId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // State
  const [difficulty, setDifficulty] = useState<DifficultyType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [score, setScore] = useState(0);
  const [summary, setSummary] = useState<QuizSummary[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // React Query hooks
  const { data: boothData, isLoading: loadingBooth } = useQuery({
    queryKey: ["booth", boothId],
    queryFn: () => fetchBoothData(boothId),
    enabled: !!boothId,
  });

  const { data: progressData, isLoading: loadingProgress } = useQuery({
    queryKey: ["progress", boothId],
    queryFn: () => fetchUserProgress(boothId),
    enabled: !!boothId,
  });

  const { 
    data: questions, 
    isLoading: loadingQuestions,
    refetch: refetchQuestions 
    } = useQuery({
    queryKey: ["questions", boothId, difficulty],
    queryFn: () => fetchQuestions(boothId, difficulty!),
    enabled: !!boothId && !!difficulty,
    });

    const saveProgressMutation = useMutation({
    mutationFn: ({ finalScore, finalTime }: { finalScore: number; finalTime: number }) =>
        saveProgressToFirestore(boothId, finalScore, finalTime),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["progress", boothId] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    });

  // Effects
    useEffect(() => {
        if (difficulty && questions && questions.length > 0 && !startTime) {
            setStartTime(Date.now());
        }

        let interval: NodeJS.Timeout | null = null;
        if (startTime && !quizFinished) {
            interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [startTime, difficulty, questions, quizFinished]);

  // Handlers
    const handleSelectDifficulty = async (level: DifficultyType) => {
        console.log("Selected difficulty:", level);
        setDifficulty(level);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowSummary(false);
        setScore(0);
        setSummary([]);
        setStartTime(null);
        setElapsedTime(0);
        setQuizFinished(false);
    };

    const handleOptionSelect = (option: string) => {
        if (!questions) return;
        
        const currentQuestion = questions[currentQuestionIndex];
        setAnswers({
        ...answers,
        [currentQuestion.id]: option,
        });
    };

    const handleNext = () => {
        if (!questions) return;
        
        if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleFinishQuiz = () => {
        if (!questions) return;
        
        let totalScore = 0;
        const resultSummary: QuizSummary[] = questions.map((q) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correct_answer;
        const points = isCorrect ? q.points_correct : q.points_incorrect;
        totalScore += points;
        return {
            question: q.question_text,
            userAnswer: userAnswer || "No answer",
            correctAnswer: q.correct_answer,
            isCorrect,
            points,
        };
        });

        setScore(totalScore);
        setSummary(resultSummary);
        setQuizFinished(true);
        setShowSummary(true);

        saveProgressMutation.mutate({ finalScore: totalScore, finalTime: elapsedTime });
    };

    const handleGoHome = () => {
    navigate("/home");
    };

    return {
        // Data
        boothData,
        progressData,
        questions,
        currentQuestion: questions ? questions[currentQuestionIndex] : null,
        
        // State
        difficulty,
        currentQuestionIndex,
        answers,
        showSummary,
        score,
        summary,
        elapsedTime,
        quizFinished,
        
        // Loading states
        loadingBooth,
        loadingProgress,
        loadingQuestions,
        savingProgress: saveProgressMutation.isPending,
        
        // Handlers
        handleSelectDifficulty,
        handleOptionSelect,
        handleNext,
        handlePrev,
        handleFinishQuiz,
        handleGoHome,
        
        // Computed values
        totalQuestions: questions?.length || 0,
        isLastQuestion: questions ? currentQuestionIndex === questions.length - 1 : false,
        isFirstQuestion: currentQuestionIndex === 0,
        hasAnsweredCurrent: questions ? !!answers[questions[currentQuestionIndex]?.id] : false,
    };
};
