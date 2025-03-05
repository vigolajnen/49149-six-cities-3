import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  hasAccess?: boolean;
};

export default function PrivateRoute({ children, hasAccess = false }: PrivateRouteProps) {
  return hasAccess ? children : <Navigate to={'/login'} />;
}
