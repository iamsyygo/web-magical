// https://reactrouter.com/en/main/start/tutorial

import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import SignIn from '@/pages/signin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
]);
