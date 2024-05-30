import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const LoginPage = Loadable(lazy(() => import('pages/Manager/Auth/Login')));
const DashboardPage = Loadable(lazy(() => import('pages/Manager/Dashboard')));

// worker
const WorkerPage = Loadable(lazy(() => import('pages/Manager/Worker')));
const WorkerCreatePage = Loadable(lazy(() => import('pages/Manager/Worker/create')));
const WorkerEditPage = Loadable(lazy(() => import('pages/Manager/Worker/edit')));

// StockHistoryPage
const StockHistoryPage = Loadable(lazy(() => import('pages/Manager/StockHistory')));
const StockHistoryCreatePage = Loadable(lazy(() => import('pages/Manager/StockHistory/create')));
const StockHistoryEditPage = Loadable(lazy(() => import('pages/Manager/StockHistory/edit')));

const routePrefix = '/manager';
const ManagerRoutes = (isLoggedIn) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to={`${routePrefix}/login`} />,
    children: [
      {
        path: routePrefix,
        element: <DashboardPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'workers',
        element: <WorkerPage />
      },
      {
        path: 'workers/create',
        element: <WorkerCreatePage />
      },
      {
        path: 'workers/edit/:id',
        element: <WorkerEditPage />
      },
      {
        path: 'stock-histories',
        element: <StockHistoryPage />
      },
      {
        path: 'stock-histories/create',
        element: <StockHistoryCreatePage />
      },
      {
        path: 'stock-histories/edit/:id',
        element: <StockHistoryEditPage />
      },
    ]
  },
  {
    path: `${routePrefix}/login`,
    element: <LoginPage />,
  }
];

export default ManagerRoutes;