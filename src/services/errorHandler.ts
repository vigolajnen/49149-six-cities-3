import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AuthStatus } from '../enums/auth';
import { ErrorWithStatus, User } from '../types';
import { dropToken } from '../services/token';

export type HandleErrorOptions = {
  error: ErrorWithStatus | SerializedError;
  setAuthorizationStatus: (authStatus: AuthStatus) => void;
  setUser: (user: User) => void;
};

export function handleError(options: HandleErrorOptions): void {
  const { error, setAuthorizationStatus, setUser } = options;

  if ('status' in error && typeof error === 'object') {
    switch (error.status) {
      case 401:
        dropToken();
        setAuthorizationStatus(AuthStatus.NoAuth);
        setUser({} as User);
        toast.error('Ошибка авторизации.');
        break;
      default:
        toast.error(`Ошибка ${error.status}`);
        break;
    }
  } else {
    toast.error('Произошла непредвиденная ошибка.');
  }
}
