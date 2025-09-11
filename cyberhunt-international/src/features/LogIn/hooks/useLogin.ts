import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/loginUser";
import type { LoginData } from "../api/loginUser";

export function useLogin(onSuccess?: (uid: string) => void) {
    return useMutation({
        mutationFn: (data: LoginData) => loginUser(data),
        onSuccess,
});
}
