//this file is used to fetch the booth data, progress data, questions and save the progress to  firestore
import { db } from "../../../firebaseConfig";
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { BoothData, ProgressData, Question, DifficultyType } from "../types";

const auth = getAuth();

//fetch the booth data from the firestore
export const fetchBoothData = async (boothId: string): Promise<BoothData> => {
    const boothRef = doc(db, "booths", boothId);
    const boothSnap = await getDoc(boothRef);

    if (!boothSnap.exists()) {
        throw new Error("Booth not found");
    }

    return {
    id: boothSnap.id,
    ...boothSnap.data()
    } as BoothData;
};

//fetch the user progress from the firestore
export const fetchUserProgress = async (boothId: string): Promise<ProgressData | null> => {
    const userId = auth.currentUser?.uid;
    if (!userId) return null;

    const progressRef = doc(db, "users", userId, "user_booth_progress", boothId);
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
        return null;
    }

    return progressSnap.data() as ProgressData;
};

//fetch the questions from the firestore depending on the difficulty selected by the user, either easy or hard
export const fetchQuestions = async (boothId: string, difficulty: DifficultyType): Promise<Question[]> => {
    const questionsRef = collection(db, "booths", boothId, 
        difficulty === "easy" ? "questions_easy" : "questions_hard"
    );
    const questionsSnap = await getDocs(questionsRef);

    const allQuestions = questionsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Question[];

    // Filter out invalid questions (empty options, missing required fields)
    const validQuestions = allQuestions.filter(question => {
        return question.question_text && 
            question.options && 
            Array.isArray(question.options) && 
            question.options.length > 0 &&
            question.correct_answer &&
            typeof question.points_correct === 'number' &&
            typeof question.points_incorrect === 'number';
    });

    console.log(`Fetched ${allQuestions.length} questions, ${validQuestions.length} are valid`);
    
    return validQuestions;
};

export const saveProgressToFirestore = async (
    boothId: string, 
    finalScore: number, 
    finalTime: number
): Promise<void> => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const userRef = doc(db, "users", userId);
    const progressRef = doc(db, "users", userId, "user_booth_progress", boothId);

    try {
        console.log("Saving progress for:", userId, boothId, finalScore, finalTime);

    // Save individual progress
    await setDoc(progressRef, {
    booth_id: boothId,
    score_obtained: finalScore,
    time_taken: finalTime,
    visited: true
    });

    // Update user's total score and visited_booths
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const userData = userSnap.data();
        const newScore = (userData.score || 0) + finalScore;
        const newTotalTime = (userData.total_time || 0) + finalTime;
    
        const visitedBooths = userData.visited_booths || [];
        const updatedVisitedBooths = visitedBooths.includes(boothId)
        ? visitedBooths
        : [...visitedBooths, boothId];

        await updateDoc(userRef, {
            score: newScore,
            total_time: newTotalTime,
            visited_booths: updatedVisitedBooths
        });
    }

    console.log("Progress saved successfully.");
    } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
    }
};
