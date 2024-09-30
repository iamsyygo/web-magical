import App from '@/App';
import NotFound from '@/pages/404';
import Dashboard from '@/pages/Dashboard';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

type RawRoute = (RouteObject & {
  nodeRef?: React.RefObject<HTMLDivElement>;
  children?: RawRoute;
})[];

export const routes: RawRoute = [
  {
    path: 'main',
    element: <Dashboard />,
    children: [
      {
        path: 'setting',
        children: [
          {
            path: 'profile',
            Component: lazy(() => import('@/pages/setting/profile')),
          },
          {
            path: 'security',
            Component: lazy(() => import('@/pages/setting/security')),
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'user',
            Component: lazy(() => import('@/pages/system/user')),
          },
          {
            path: 'role',
            Component: lazy(() => import('@/pages/system/role')),
          },
          {
            path: 'permission',
            Component: lazy(() => import('@/pages/system/permission')),
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'signin',
    Component: lazy(() => import('@/pages/signin')),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

// https://reactrouter.com/en/main/start/tutorial
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
  },
]);
