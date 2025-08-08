import { signOut } from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  const logoutMutation = useMutation({ mutationFn: signOut });

  return { logoutMutation };
};
