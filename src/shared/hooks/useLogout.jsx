import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/auth/loginApi";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            navigate('/auth/login');
        },
    });

    return { logoutMutation };
}