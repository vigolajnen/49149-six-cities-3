import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AuthStatus } from '../enums/auth';
import { ApiError, ErrorWithStatus, User } from '../types';
import { dropToken } from '../services/token';

export type HandleErrorOptions = {
  error: ErrorWithStatus | SerializedError | ApiError;
  setAuthorizationStatus: (authStatus: AuthStatus) => void;
  setUser: (user: User | null) => void;
};

export function handleError(options: HandleErrorOptions): void {
  const { error, setAuthorizationStatus, setUser } = options;
  const apiError = error as ApiError;

  if ('status' in error && typeof error === 'object') {
    switch (error.status) {
      case 401:
        dropToken();
        setAuthorizationStatus(AuthStatus.NoAuth);
        setUser(null);
        toast.error('Ошибка авторизации.');
        break;
      case 400:
        toast.error(apiError.data?.details?.[0]?.messages?.[0]);
        break;
      default:
        toast.error(`Ошибка ${error.status}`);
        break;
    }
  } else {
    toast.error('Произошла непредвиденная ошибка.');
  }
}
