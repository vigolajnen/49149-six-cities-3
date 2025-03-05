import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PlaceCardProps } from '../types';
import Main from './Main';
import Login from './Login';
import Offer from './Offer';
import Favorites from './Favorites';
import PrivateRoute from './PrivateRoute';
import PageNotFound from './PageNotFound';

type AppProps = {
  data: PlaceCardProps[];
};

export default function App({ data }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main cards={data} />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path='/offer/:id' element={<Offer />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
