import { lazy, Suspense} from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';



export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const CreateUserPage = lazy(() => import('src/pages/create-user'));
export const CharactersPage = lazy(() => import('src/pages/characters'));
export const LocationsPage = lazy(() => import('src/pages/location'));
export const ResidentPage = lazy(() => import('src/sections/locations/view/resident'));
export const EpisodePage = lazy(() => import('src/pages/episodes'));
export const CharactersPerEpisode = lazy(() => import('src/sections/episodes/view/characters-per-episode'));

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
          path: 'characters',
          element: <CharactersPage/>,
        },

        {
          path: 'locations',
          element: <LocationsPage/>,
        },

        {
          path: 'episodes',
          element: <EpisodePage/>,
        },
        {
          path: 'characters/:episodeId',
          element: <CharactersPerEpisode/>,
        },
        {
          path: 'resident/:residentId',
          element: <ResidentPage/>,
        }
      ],
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



  return routes;
}
