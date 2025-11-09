import { useMutation } from '@tanstack/react-query';
import { deleteEmployeeRequest } from '../api/deleteEmployee';

export const useRemoveEmployee = (options = {}) => {
  return useMutation({
    mutationFn: deleteEmployeeRequest,
    ...options
  });
};
