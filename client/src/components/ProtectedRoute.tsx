import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  // Si el usuario NO está logueado, redirigir al login
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
