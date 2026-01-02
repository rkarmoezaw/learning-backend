import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/auth/me")).data,
    retry: false,
  });

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cred) => (await api.post("/auth/login", cred)).data,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      qc.setQueryData(["user"], data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // 1. Call the backend to clear the cookie and DB record
      return await api.post("/auth/logout");
    },
    onSuccess: () => {
      // 2. Remove the Access Token from storage
      localStorage.removeItem("accessToken");

      // 3. IMPORTANT: Wipe the TanStack cache
      // This prevents the next user from seeing the previous user's data
      queryClient.clear();

      // 4. Redirect to login
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Even if the server call fails, we usually want to clear the local session
      localStorage.removeItem("accessToken");
      queryClient.clear();
      navigate("/login");
    },
  });
};
