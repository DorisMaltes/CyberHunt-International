import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../../../firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useUserData = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            throw new Error("No authenticated user");
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            throw new Error("User data not found");
        }

        return userSnap.data();
        },
        staleTime: Infinity,
    });

    useEffect(() => {
        const auth = getAuth();
        
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (!user) {
            queryClient.setQueryData(["userData"], null);
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
            queryClient.setQueryData(["userData"], doc.data());
            }
        });

        return unsubscribeSnapshot;
        });

        return unsubscribeAuth;
    }, [queryClient]);

    return query;
};