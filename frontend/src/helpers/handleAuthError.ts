import { AxiosError } from 'axios';
import { authService } from '../services/auth.service';
import { NavigateFunction } from 'react-router-dom';

export const handleAuthError = async (error: unknown, navigate: NavigateFunction) => {
  const axiosError = error as AxiosError;
  if (axiosError?.response?.status === 401) {
    try {
      await authService.refreshToken();
    } catch {
      return navigate('/');
    }
  }
};