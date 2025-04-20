import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main';
import Login from './Login';
import Offer from './Offer';
import Favorites from './Favorites';
import PrivateRoute from './PrivateRoute';
import PageNotFound from './PageNotFound';
import LayoutMain from '../layouts/LayoutMain';
import { Paths } from '../enums/paths';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedActions } from '../hooks/useTypedActions';
import { getToken } from '../services/token';
import { AuthStatus } from '../enums/auth';

export default function App(): JSX.Element {
  const authorizationStatus = useTypedSelector((state) => state.app.authorizationStatus);
  const { setAuthorizationStatus } = useTypedActions();
  const token = getToken();

  useEffect(() => {
    if (token) {
      setAuthorizationStatus(AuthStatus.Auth);
    } else {
      setAuthorizationStatus(AuthStatus.NoAuth);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Main} element={<LayoutMain />}>
          <Route index path={Paths.Main} element={<Main />} />
          <Route path={Paths.MainCity} element={<Main />} />
          <Route path={Paths.Login} element={<Login />} />
          <Route
            path={Paths.Favorites}
            element={
              <PrivateRoute hasAccess={authorizationStatus}>
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
