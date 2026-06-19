import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteEmployeeApi } from "@/entities/company";
import { validationRules } from "@/shared/utils/validators";

export const useInviteEmployee = (isOpen) => {
  const queryClient = useQueryClient();
  const [inviteLink, setInviteLink] = useState(null);

  const form = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: inviteEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-invites"] });
    },
  });

  const {
    isPending: isSubmitting,
    isError,
    error,
    reset: resetMutation,
    mutateAsync,
  } = mutation;

  const resetAll = () => {
    form.reset();
    resetMutation();
    setInviteLink(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    form.reset();
    resetMutation();
    setInviteLink(null);
  }, [isOpen]);

  const onSubmit = async ({ email }) => {
    try {
      const result = await mutateAsync(email.trim());
      setInviteLink(result.invite_link ?? null);
    } catch {
      // Ошибка уже в состоянии мутации
    }
  };

  return {
    form: {
      register: () => form.register("email", validationRules.email),
      handleSubmit: form.handleSubmit(onSubmit),
      errors: form.formState.errors,
      isValid: form.formState.isValid,
    },
    states: {
      isSuccess: Boolean(inviteLink),
      isSubmitting,
      isError,
      error,
    },
    actions: {
      resetAll,
    },
    errorMessage:
      error?.response?.data?.error ||
      error?.message ||
      "Не удалось создать ссылку",
    inviteLink,
  };
};
