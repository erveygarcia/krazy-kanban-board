import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
const ProtectedRoute = ({ children }) => {
    // Si el usuario NO está logueado, redirigir al login
    if (!Auth.loggedIn()) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // Si está logueado, renderizar el componente hijo
    return children;
};
export default ProtectedRoute;
