import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main';
import Login from './Login';
import Offer from './Offer';
import Favorites from './Favorites';
import PrivateRoute from './PrivateRoute';
import PageNotFound from './PageNotFound';
import { Paths } from '../enums/paths';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Main} element={<Main />} />
        <Route path={Paths.Login} element={<Login />} />
        <Route
          path={Paths.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={Paths.Offer} element={<Offer />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
