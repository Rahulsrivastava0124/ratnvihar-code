import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardPage = Loadable(lazy(() => import('pages/SuperAdmin/Dashboard')));

// retailer
const RetailerPage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer')));
const MyRetailerPage = Loadable(lazy(() => import('pages/SuperAdmin/MyRetailer')));
const RetailerCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer/create')));
const RetailerEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer/edit')));
const RetailerViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer/view')));

//stocks
const StocksPage =Loadable(lazy(() => import('pages/SuperAdmin/Stocks')));
const StocksViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Stocks/view')));

//return stocks
const ReturnStocksPage =Loadable(lazy(() => import('pages/SuperAdmin/ReturnStocks')));
const ReturnStocksViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnStocks/view')));

//profile
const EditProfilePage = Loadable(lazy(() => import('pages/Se/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('pages/Se/Profile/ChangePassword')));


//customers
const CustomerPage = Loadable(lazy(() => import('pages/SuperAdmin/Customer')));
const CustomerViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Customer/view')));

//paymenta
const PaymentPage = Loadable(lazy(() => import('pages/SuperAdmin/Payment')));
const WalletPage = Loadable(lazy(() => import('pages/SuperAdmin/Payment/wallet')));

const OrderPage = Loadable(lazy(() => import('pages/Se/Orders')));
const OrderViewPage = Loadable(lazy(() => import('pages/Se/Orders/View')));

//attendence
const AttendencePage = Loadable(lazy(() => import('pages/Se/Attendence')));

//return purchase
const ReturnPurchasePage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnPurchase')));
const ReturnPurchaseViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnPurchase/view')));

//return sale
const ReturnSalePage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnSale')));
const ReturnSalePageViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnSale/view')));

//purchase
const PurchasePage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase')));
const PurchaseViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/view')));

//sales
const SalePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/create')));
const SaleViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/view')));
const SaleEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/edit')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Received/View')));

// leave-application
const LeaveApplicationPage = Loadable(lazy(() => import('pages/SuperAdmin/Leave_application')));
const LeaveApplicationViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Leave_application/view')));
const LeaveApplicationCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Leave_application/create')));
const LeaveApplicationEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Leave_application/edit')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval/view')));

//My Performance
const MyPerformancePage = Loadable(lazy(() => import('pages/SuperAdmin/MyPerformance')));

//search
const SearchPage = Loadable(lazy(() => import('pages/SuperAdmin/Search')));

// expense
const ExpensePage =Loadable(lazy(() => import('pages/SuperAdmin/Expense')));

//return orders
const ReturnOrderPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder/view')));

const routePrefix = '/sales-executive';
const SeRoutes = (isLoggedIn) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to={`/login`} />,
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
        path: 'retailers',
        element: <RetailerPage />
      },
      {
        path: 'my-retailers',
        element: <MyRetailerPage />
      },
      {
        path: 'retailers/create',
        element: <RetailerCreatePage />
      },
      {
        path: 'retailers/edit/:id',
        element: <RetailerEditPage />
      },
      {
        path: 'retailers/view/:id',
        element: <RetailerViewPage />
      },
      {
        path: 'stocks',
        element: <StocksPage />
      },
      {
        path: 'stocks/view/:id',
        element: <StocksViewPage />
      },
      {
        path: 'return-stocks',
        element: <ReturnStocksPage />
      },
      {
        path: 'return-stocks/view/:id',
        element: <ReturnStocksViewPage />
      },
      {
        path: 'edit-profile',
        element: <EditProfilePage />
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />
      },
      {
        path: 'orders',
        element: <OrderPage />
      },
      {
        path: 'orders/view/:id',
        element: <OrderViewPage />
      },
      {
        path: 'customers',
        element: <CustomerPage />
      },
      {
        path: 'customers/view/:id',
        element: <CustomerViewPage />
      },
      {
        path: 'payments',
        element: <PaymentPage />
      },
      {
        path: 'wallet-history',
        element: <WalletPage />
      },
      {
        path: 'attendence',
        element: <AttendencePage />
      },
      {
        path: 'purchases',
        element: <PurchasePage />
      },
      {
        path: 'purchases/view/:id',
        element: <PurchaseViewPage />
      },
      {
        path: 'return-purchase',
        element: <ReturnPurchasePage />
      },
      {
        path: 'return-purchase/view/:id',
        element: <ReturnPurchaseViewPage />
      },
      {
        path: 'return-sale',
        element: <ReturnSalePage />
      },
      {
        path: 'return-sale/view/:id',
        element: <ReturnSalePageViewPage />
      },
      {
        path: 'sales',
        element: <SalePage />
      },
      {
        path: 'sales/create',
        element: <SaleCreatePage />
      },
      {
        path: 'sale-on-approve',
        element: <SaleOnApprovePage />
      },
      {
        path: 'sale-on-approve/view/:id',
        element: <SaleOnApproveViewPage />
      },
      {
        path: 'sales/view/:id',
        element: <SaleViewPage />
      },
      {
        path: 'sales/edit/:id',
        element: <SaleEditPage />
      },
      {
        path: 'transfer',
        element: <TransferPage />
      },
      {
        path: 'transfer/view/:id',
        element: <TransferViewPage />
      },
      {
        path: 'received',
        element: <ReceivedPage />
      },
      {
        path: 'received/view/:id',
        element: <ReceivedViewPage />
      },
      {
        path: 'leave-applications',
        element: <LeaveApplicationPage />
      },
      {
        path: 'leave-applications/create',
        element: <LeaveApplicationCreatePage />
      },
      {
        path: 'leave-applications/edit/:id',
        element: <LeaveApplicationEditPage />
      },
      {
        path: 'leave-applications/view/:id',
        element: <LeaveApplicationViewPage />
      },
      {
        path: 'my-performance',
        element: <MyPerformancePage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'expenses',
        element: <ExpensePage />
      },
      {
        path: 'return-orders',
        element: <ReturnOrderPage />
      },
      {
        path: 'return-orders/view/:id',
        element: <ReturnOrderViewPage />
      }
    ]
  }
];

export default SeRoutes;