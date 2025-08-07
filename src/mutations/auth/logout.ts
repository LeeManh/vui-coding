import { signOut } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  const logoutMutation = useMutation({ mutationFn: signOut });

  return { logoutMutation };
};
