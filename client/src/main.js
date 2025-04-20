import { jsx as _jsx } from "react/jsx-runtime";
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Board from './pages/Board';
import ErrorPage from './pages/ErrorPage';
import EditTicket from './pages/EditTicket';
import CreateTicket from './pages/CreateTicket';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            {
                index: true,
                element: (_jsx(ProtectedRoute, { children: _jsx(Board, {}) }))
            },
            {
                path: '/edit',
                element: (_jsx(ProtectedRoute, { children: _jsx(EditTicket, {}) }))
            },
            {
                path: '/create',
                element: (_jsx(ProtectedRoute, { children: _jsx(CreateTicket, {}) }))
            },
            {
                path: '/login',
                element: _jsx(Login, {})
            }
        ]
    }
]);
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(_jsx(RouterProvider, { router: router }));
}
