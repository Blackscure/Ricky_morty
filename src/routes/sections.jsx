import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';


export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const CreateUserPage = lazy(() => import('src/pages/create-user'));
export const RolesPage = lazy(() => import('src/pages/roles'));
export const CharactersPage = lazy(() => import('src/pages/characters'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        {
          path: 'create-user',
          element: <CreateUserPage />,
        },
        {
          path: 'roles',
          element: <RolesPage />,
        },
        {
          path: 'characters',
          element: <CharactersPage/>,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },

   
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '', // Empty path for the default route
      element: <Navigate to="/login" replace />, // Redirect to the login route
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  // Automatically redirect to login on the initial load
  useEffect(() => {
    if (window.location.pathname === '/') {
      // Redirect only if the path is the root
      window.location.replace('/login');
    }
  }, []);

  return routes;
}
