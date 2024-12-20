import Alert from "@/components/Alert";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
export const authApi = async (payload: { email: string; password: string }) => {
  return await axios.post("/login", payload);
};
export const useLoginApi = () => {
  const navigate = useNavigate();

  const query = useMutation({
    mutationFn: authApi,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error: AxiosError) => {
      Alert("error", error?.message);
    },
  });

  return {
    ...query,
  };
};
