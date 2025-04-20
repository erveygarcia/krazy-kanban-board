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
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        ) 
      }, 
      {
        path: '/edit',
        element: (
          <ProtectedRoute>
            <EditTicket />
          </ProtectedRoute>
        )
      },
      {
        path: '/create',
        element: (
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        )  
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
