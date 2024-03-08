import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login, NotFound, Singnup, UserForm, Users } from './views';
import { DefaultLayout, GuestLayout } from './components';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/singnup',
                element: <Singnup />
            },
        ]
    },    
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;