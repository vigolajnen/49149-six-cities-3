import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthStatus } from '../../enums/auth';
import { Paths } from '../../enums/paths';
import { useTypedActions } from '../../hooks/useTypedActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import LayoutMain from '../../layouts/LayoutMain';
import { useGetLoginQuery } from '../../services/api';
import { handleError } from '../../services/errorHandler';
import { getToken } from '../../services/token';
import { selectAuthorizationStatus } from '../../store/selectors';
import PrivateRoute from '../common/PrivateRoute';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import Main from '../pages/Main';
import PageNotFound from '../pages/NotFound';
import Offer from '../pages/Offer';
import Spinner from '../ui/Spinner';

// 1. AuthStatus.Unknown
// При первой загрузке (начальное состояние)
// В первые мс после обновления страницы
// Пока идет первоначальная проверка токена(до завершения запроса)

// 2. AuthStatus.NoAuth
// При отсутствии токена (!token)
// Когда сервер вернул ошибку авторизации (401, 403)
// По истечении 10-секундного таймаута проверки
// После явного выхода пользователя (logout)
// При любых неудачных запросах на аутентификацию

// 3. AuthStatus.Auth
// После успешного ответа от useGetLoginQuery (isSuccess && data)
// После успешного входа через форму логина
// При наличии валидного токена и подтверждении от сервера

export default function App(): JSX.Element {
  const authorizationStatus = useTypedSelector(selectAuthorizationStatus);
  const { setAuthorizationStatus, setUser } = useTypedActions();
  const token = getToken();
  const { data, isLoading, isSuccess, isError, error } = useGetLoginQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && token) {
        setAuthorizationStatus(AuthStatus.NoAuth);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isLoading, token, setAuthorizationStatus]);

  useEffect(() => {
    if (!token) {
      setAuthorizationStatus(AuthStatus.NoAuth);
      setUser(null);
      return;
    }

    if (isLoading) {
      return;
    }

    if (isSuccess && data) {
      setAuthorizationStatus(AuthStatus.Auth);
      setUser(data);
      return;
    }

    if (isError && error) {
      handleError({
        error,
        setAuthorizationStatus,
        setUser,
      });
      setAuthorizationStatus(AuthStatus.NoAuth);
      return;
    }

    setAuthorizationStatus(AuthStatus.NoAuth);
  }, [token, isLoading, isSuccess, isError, error, data, setAuthorizationStatus, setUser]);

  if ((isLoading && token) || authorizationStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Main} element={<LayoutMain />}>
          <Route index path={Paths.Main} element={<Main />} />
          <Route path={Paths.MainCity} element={<Main />} />
          <Route
            path={Paths.Login}
            element={
              <PrivateRoute onlyUnAuth>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={Paths.Offer} element={<Offer hasAccess={authorizationStatus} />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
