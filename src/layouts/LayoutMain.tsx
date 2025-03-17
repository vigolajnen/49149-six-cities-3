import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { Paths } from '../enums/paths';
import { PageClass } from '../enums/pageClass';
import { AuthStatus } from '../enums/auth';

export default function LayoutMain() {
  const { pathname } = useLocation();
  const typePathname = pathname as Paths;
  const isMain = typePathname === Paths.Main;
  const isLogin = typePathname === Paths.Login;

  return (
    <div className={`page ${isMain ? PageClass.Main : ''} ${isLogin ? PageClass.Login : ''} `}>
      <Header hasAccess={AuthStatus.NoAuth} />
      <Outlet />
    </div>
  );
}
