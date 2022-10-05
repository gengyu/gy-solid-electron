import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';

import Home from './pages/home';
import { SyncFileList } from "@/pages/SyncFileList";

export const routes: RouteDefinition[] = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/syncFileList',
        component: SyncFileList,
    },
    // {
    //   path: '/about',
    //   component: lazy(() => import('./pages/about')),
    //   data: AboutData,
    // },
    // {
    //   path: '/messageChannel',
    //   component: lazy(() => import('./pages/messageChannel')),
    //   data: AboutData,
    // },
    // {
    //   path: '/darkMode',
    //   component: lazy(() => import('./pages/darkMode')),
    //   data: AboutData,
    // },
    {
        path: '**',
        component: lazy(() => import('./errors/404')),
    },
];
