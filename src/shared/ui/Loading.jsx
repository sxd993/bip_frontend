import { CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <CircularProgress size={60} style={{ color: '#dc2626' }} />
        <p className="mt-4 text-gray-600 font-medium">Загрузка...</p>
      </div>
    </div>
  );
};
