import { Navigate } from 'react-router-dom';
import { AuthStatus, Paths } from '../enums/paths';

type PrivateRouteProps = {
  children: JSX.Element;
  hasAccess?: AuthStatus;
};

export default function PrivateRoute({ children, hasAccess = AuthStatus.NoAuth }: PrivateRouteProps) {
  return hasAccess === AuthStatus.Auth ? children : <Navigate to={Paths.Login} />;
}
