import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppealApi } from "@/entities/deals";
import { useFileUpload } from "@/shared/hooks/useFileUpload";
import {
  VALIDATION_RULES,
  FORM_DEFAULTS,
  DEFAULT_APPEAL_CATEGORY_ID,
} from "./constants";

export const useCreateAppealForm = (isOpen, onClose) => {
  const form = useForm({
    defaultValues: FORM_DEFAULTS,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = form;
  const fileUpload = useFileUpload();
  const { clearFiles, getBase64Files } = fileUpload;

  const queryClient = useQueryClient();
  const createAppealMutation = useMutation({
    mutationFn: createAppealApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appeals"] });
    },
  });

  const {
    isSuccess,
    isPending: isSubmitting,
    isError,
    error,
    reset: resetMutation,
  } = createAppealMutation;

  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.comment.trim()) {
      return;
    }

    try {
      const base64Files = await getBase64Files();
      const cleanFiles = base64Files.map((file) => {
        const { type: _type, ...cleanFile } = file;
        return cleanFile;
      });

      await createAppealMutation.mutateAsync({
        category_id: DEFAULT_APPEAL_CATEGORY_ID,
        title: data.title,
        comment: data.comment,
        files: cleanFiles,
      });
    } catch (error) {
      console.error("Ошибка создания обращения:", error);
    }
  };

  const resetAll = () => {
    reset();
    clearFiles();
    resetMutation();
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      resetMutation();
    }
  }, [isOpen, resetMutation]);

  return {
    form: {
      register: (field) => register(field, VALIDATION_RULES[field]),
      handleSubmit: handleSubmit(onSubmit),
      watch,
      errors,
      isFormValid: isValid && fileUpload.fileErrors.length === 0,
      reset,
      getValues: form.getValues,
    },
    fileUpload,
    states: {
      isSuccess,
      isSubmitting,
      isError,
      error,
    },
    actions: {
      handleClose,
      resetAll,
    },
    errorMessage:
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "Ошибка при создании обращения",
  };
};
