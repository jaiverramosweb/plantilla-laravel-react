import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login, NotFound, Singnup, UserForm, Users } from './views';
import { DefaultLayout, GuestLayout } from './components';
import { PileoPage } from './views/pileo/Page';
import { PileoConfirm } from './views/pileo/Confirm';
import { FirewallPage } from './views/firewall/Page';
import { NewFirewallPage } from './views/firewall/new/Page';
import { InfoFirewall } from './views/firewall/InfoFirewall';
import { ConfigPage } from './views/config/Page';
import { PageClient } from './views/clients/Page';
import { Pileo } from './views/pileo/Pileo';

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
            {
                path: '/configuraciones',
                element: <ConfigPage />
            },
            {
                path: '/client/planes',
                element: <PageClient />
            },
            {
                path: '/pileo',
                element: <PileoPage />
            },
            {
                path: '/pileo/:id',
                element: <Pileo />
            },
            {
                path: '/pileo/confirm/:id',
                element: <PileoConfirm />
            },
            {
                path: '/firewalls',
                element: <FirewallPage />
            },
            {
                path: '/firewalls/new',
                element: <NewFirewallPage />
            },
            {
                path: '/firewalls/:id',
                element: <InfoFirewall />
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