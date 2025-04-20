import { Outlet, useLocation, useParams } from 'react-router-dom';

import Header from '../components/Header';
import { Paths } from '../enums/paths';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function LayoutMain() {
  const { city } = useParams();
  const { pathname } = useLocation() as { pathname: Paths };
  const isMain = pathname === Paths.Main;
  const isLogin = pathname === Paths.Login;
  const isMainCity = pathname === (Paths.MainCity.replace(':city', String(city)) as Paths);
  const authorizationStatus = useTypedSelector((state) => state.app.authorizationStatus);

  return (
    <div className={`page ${isMain || isMainCity ? 'page--gray page--main' : ''} ${isLogin ? 'page--gray page--login' : ''} `}>
      <Header hasAccess={authorizationStatus} />
      <Outlet />
    </div>
  );
}
