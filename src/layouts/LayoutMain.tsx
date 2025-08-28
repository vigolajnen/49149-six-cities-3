import { useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/layout/Header';
import { Paths } from '../enums/paths';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectActiveCity, selectAuthorizationStatus } from '../store/selectors';

export default function LayoutMain() {
  const { pathname } = useLocation() as { pathname: Paths };
  const isMainPage = pathname === Paths.Main;
  const isLogin = pathname === Paths.Login;

  const { activeCity, authorizationStatus } = useTypedSelector(
    (state) => ({
      activeCity: selectActiveCity(state),
      authorizationStatus: selectAuthorizationStatus(state),
    }),
    shallowEqual, //быстрое поверхностное сравнение объектов
  );

  const isMainCity = pathname === (Paths.MainCity.replace(':city', String(activeCity)) as Paths);

  const pageClasses = useMemo(() => {
    const classes = ['page'];
    if (isMainPage || isMainCity) {
      classes.push('page--gray', 'page--main');
    } else if (isLogin) {
      classes.push('page--gray', 'page--login');
    }
    return classes.join(' ');
  }, [isMainPage, isMainCity, isLogin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={pageClasses}>
      <Header hasAccess={authorizationStatus} />
      <Outlet />
    </div>
  );
}
