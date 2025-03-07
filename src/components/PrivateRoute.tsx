import { Navigate } from 'react-router-dom';
import { Paths } from '../enums/paths';

type PrivateRouteProps = {
  children: JSX.Element;
  hasAccess?: boolean;
};

export default function PrivateRoute({ children, hasAccess = false }: PrivateRouteProps) {
  return hasAccess ? children : <Navigate to={Paths.Login} />;
}
