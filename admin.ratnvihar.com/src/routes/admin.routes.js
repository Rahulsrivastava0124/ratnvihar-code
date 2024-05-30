import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const LoginPage = Loadable(lazy(() => import('pages/Admin/Auth/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('pages/Admin/Auth/ForgotPassword')));
const DashboardPage = Loadable(lazy(() => import('pages/SuperAdmin/Dashboard')));
const CertificatePage = Loadable(lazy(() => import('pages/SuperAdmin/Certificate')));
const CategoryPage = Loadable(lazy(() => import('pages/SuperAdmin/Category')));
const SubCategoryPage = Loadable(lazy(() => import('pages/SuperAdmin/SubCategory')));

//country
const CountryPage = Loadable(lazy(() => import('pages/SuperAdmin/Country')));

//State
const StatePage = Loadable(lazy(() => import('pages/SuperAdmin/State')));

//District
const DistrictPage = Loadable(lazy(() => import('pages/SuperAdmin/District')));

// investor
const InvestorPage = Loadable(lazy(() => import('pages/SuperAdmin/Investor')));
const InvestorCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Investor/create')));
const InvestorEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Investor/edit')));

// admin
const AdminPage = Loadable(lazy(() => import('pages/SuperAdmin/Admin')));
const AdminCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Admin/create')));
const AdminEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Admin/edit')));
const AdminViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Admin/view')));


// distributor
const DistributorPage = Loadable(lazy(() => import('pages/SuperAdmin/Distributor')));
const DistributorCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Distributor/create')));
const DistributorEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Distributor/edit')));
const DistributorViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Distributor/view')));

// retailer
const RetailerPage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer')));
const RetailerCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer/create')));
const RetailerEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer/edit')));
const RetailerViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Retailer/view')));

// supplier
const SupplierPage = Loadable(lazy(() => import('pages/SuperAdmin/Supplier')));
const SupplierCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Supplier/create')));
const SupplierEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Supplier/edit')));
const SupplierViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Supplier/view')));

// employee
const EmployeePage = Loadable(lazy(() => import('pages/SuperAdmin/Employee')));
const EmployeeCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Employee/create')));
const EmployeeEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Employee/edit')));
const EmployeeViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Employee/view')));

// sales executive
const SalesExecutivePage = Loadable(lazy(() => import('pages/SuperAdmin/SalesExecutive')));
const SalesExecutiveCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/SalesExecutive/create')));
const SalesExecutiveEditPage = Loadable(lazy(() => import('pages/SuperAdmin/SalesExecutive/edit')));

// worker
/*const WorkerPage = Loadable(lazy(() => import('pages/SuperAdmin/Worker')));
const WorkerCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Worker/create')));
const WorkerEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Worker/edit')));*/

//tax 
const TaxPage = Loadable(lazy(() => import('pages/SuperAdmin/Tax')));

// Unit 
const UnitPage = Loadable(lazy(() => import('pages/SuperAdmin/Unit')));

// Purity 
const PurityPage = Loadable(lazy(() => import('pages/SuperAdmin/Purity')));

// Size 
const SizePage = Loadable(lazy(() => import('pages/SuperAdmin/Size')));

// Material
const MaterialPage = Loadable(lazy(() => import('pages/SuperAdmin/Material')));

// Product 
const ProductPage = Loadable(lazy(() => import('pages/SuperAdmin/Product')));
const ProductCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Product/create')));
const ProductEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Product/edit')));

//material price
const MaterialPricePage = Loadable(lazy(() => import('pages/SuperAdmin/MaterialPrice')));
const MaterialPriceCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/MaterialPrice/create')));
const MaterialPriceEditPage = Loadable(lazy(() => import('pages/SuperAdmin/MaterialPrice/edit')));

// leave-application
const LeaveApplicationPage =Loadable(lazy(() => import('pages/SuperAdmin/Leave_application')));

// expense
const ExpensePage =Loadable(lazy(() => import('pages/SuperAdmin/Expense')));

//stocks
const StocksPage =Loadable(lazy(() => import('pages/SuperAdmin/Stocks')));
const StocksViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Stocks/view')));

//purchase
const PurchasePage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase')));
const PurchaseCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/create')));
const PurchaseEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/edit')));
const PurchaseReturnPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/return')));
const PurchaseViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/view')));

//loan
const LoanPage = Loadable(lazy(() => import('pages/SuperAdmin/Loans')));
const LoanViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Loans/view')));

//sales
const SalePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/create')));
const SaleViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/view')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval/view')));
const PurchaseOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/PurchaseOnApproval')));
const PurchaseOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/PurchaseOnApproval/view')));

//profile
const EditProfilePage = Loadable(lazy(() => import('pages/Admin/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('pages/Admin/Profile/ChangePassword')));

//roles
const RolePage = Loadable(lazy(() => import('pages/SuperAdmin/Role')));

//orders
const OrderPage = Loadable(lazy(() => import('pages/Admin/Orders')));
const OrderViewPage = Loadable(lazy(() => import('pages/Admin/Orders/View')));

//customers
const CustomerPage = Loadable(lazy(() => import('pages/SuperAdmin/Customer')));

//paymenta
const PaymentPage = Loadable(lazy(() => import('pages/SuperAdmin/Payment')));
const WalletPage = Loadable(lazy(() => import('pages/SuperAdmin/Payment/wallet')));

//return policy
const ReturnPolicyPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnPolicy')));

//return purchase
const ReturnPurchasePage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnPurchase')));
const ReturnPurchaseViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnPurchase/view')));

//return sale
const ReturnSalePage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnSale')));
const ReturnSalePageViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnSale/view')));

// My Order 
const MyOrderPage = Loadable(lazy(() => import('pages/Admin/MyOrder')));
const MyOrderCreatePage = Loadable(lazy(() => import('pages/Admin/MyOrder/create')));
const MyOrderViewPage = Loadable(lazy(() => import('pages/Admin/MyOrder/View')));

//search
const SearchPage = Loadable(lazy(() => import('pages/SuperAdmin/Search')));

//return orders
const ReturnOrderPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder/view')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Received/View')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer/View')));

const routePrefix = '/admin';
const AdminRoutes = (isLoggedIn) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/admin/login" />,
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
        path: 'investors',
        element: <InvestorPage />
      },
      {
        path: 'investors/create',
        element: <InvestorCreatePage />
      },
      {
        path: 'investors/edit/:id',
        element: <InvestorEditPage />
      },
      {
        path: 'distributors',
        element: <DistributorPage />
      },
      {
        path: 'distributors/view/:id',
        element: <DistributorViewPage />
      },
      {
        path: 'retailers',
        element: <RetailerPage />
      },
      {
        path: 'retailers/create',
        element: <RetailerCreatePage />
      },
      // {
      //   path: 'retailers/edit/:id',
      //   element: <RetailerEditPage />
      // },
      {
        path: 'retailers/view/:id',
        element: <RetailerViewPage />
      },
      {
        path: 'suppliers',
        element: <SupplierPage />
      },
      {
        path: 'suppliers/create',
        element: <SupplierCreatePage />
      },
      {
        path: 'suppliers/edit/:id',
        element: <SupplierEditPage />
      },
      {
        path: 'suppliers/view/:id',
        element: <SupplierViewPage />
      },
      {
        path: 'expenses',
        element: <ExpensePage />
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
        path: 'purchases',
        element: <PurchasePage />
      },
      {
        path: 'purchases/create',
        element: <PurchaseCreatePage />
      },
      {
        path: 'purchases/edit/:id',
        element: <PurchaseEditPage />
      },
      {
        path: 'purchases/return/:id',
        element: <PurchaseReturnPage />
      },
      {
        path: 'purchases/view/:id',
        element: <PurchaseViewPage />
      },
      {
        path: 'loans',
        element: <LoanPage />
      },
      {
        path: 'loans/view/:id',
        element: <LoanViewPage />
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
        path: 'sales/view/:id',
        element: <SaleViewPage />
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
        path: 'roles',
        element: <RolePage />
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
        path: 'sales-executive',
        element: <SalesExecutivePage />
      },
      {
        path: 'customers',
        element: <CustomerPage />
      },
      {
        path: 'payments',
        element: <PaymentPage />
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
        path: 'wallet-history',
        element: <WalletPage />
      },
      {
        path: 'purchase-on-approve',
        element: <PurchaseOnApprovePage />
      },
      {
        path: 'purchase-on-approve/view/:id',
        element: <PurchaseOnApproveViewPage />
      },
      {
        path: 'return-policy',
        element: <ReturnPolicyPage />
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
        path: 'my-order',
        element: <MyOrderPage />
      },
      {
        path: 'my-order/create',
        element: <MyOrderCreatePage />
      },
      {
        path: 'my-order/view/:id',
        element: <MyOrderViewPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'return-orders',
        element: <ReturnOrderPage />
      },
      {
        path: 'return-orders/view/:id',
        element: <ReturnOrderViewPage />
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
        path: 'transfer',
        element: <TransferPage />
      },
      {
        path: 'transfer/view/:id',
        element: <TransferViewPage />
      },
      {
        path: 'distributors/create',
        element: <DistributorCreatePage />
      },
      {
        path: 'distributors/edit/:id',
        element: <DistributorEditPage />
      },
    ]
  },
  {
    path: `${routePrefix}/login`,
    element: <LoginPage />,
  },
  {
    path: `${routePrefix}/forgot-password`,
    element: <ForgotPasswordPage />,
  }
];

export default AdminRoutes;