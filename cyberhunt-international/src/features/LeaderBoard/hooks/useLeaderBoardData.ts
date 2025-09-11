import { useQuery } from "@tanstack/react-query";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useLeaderboardData = () => {
  return useQuery({
    queryKey: ["leaderboardData"],
    queryFn: async () => {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      type Player = {
        id: string;
        score?: number;
        [key: string]: any;
      };

      const players: Player[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordenar por puntaje descendente
      players.sort((a, b) => (b.score || 0) - (a.score || 0));

      // Obtener solo los primeros 5 usuarios
      const topPlayers = players.slice(0, 5);

      // Determinar posición del usuario actual
      const userIndex = players.findIndex((p) => p.id === userId);

      return {
        players: topPlayers,
        userId,
        userRank: userIndex >= 0 ? userIndex + 1 : null,
      };
    },
  });
};
