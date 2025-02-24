import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading: userIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  return {
    user,
    userIsLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
