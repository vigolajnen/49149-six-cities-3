import { Navigate } from 'react-router-dom';
import { Paths } from '../enums/paths';
import { AuthStatus } from '../enums/auth';

type PrivateRouteProps = {
  children: JSX.Element;
  hasAccess: AuthStatus;
};

export default function PrivateRoute({ children, hasAccess }: PrivateRouteProps) {
  return hasAccess === AuthStatus.Auth ? children : <Navigate to={Paths.Login} />;
}
