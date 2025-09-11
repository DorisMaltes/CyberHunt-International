//this code is a personlized hook used to Register an user this calls registerUser() api 

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/registerUser"
import type { RegisterData } from "../api/registerUser"

export function useRegister(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: RegisterData) => registerUser(data),
    onSuccess,
  });
}