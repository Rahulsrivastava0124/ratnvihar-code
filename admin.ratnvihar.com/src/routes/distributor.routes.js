import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import {hasPermission} from 'src/helpers/helper';

const LoginPage = Loadable(lazy(() => import('pages/Distributor/Auth/Login')));
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
const SalesExecutiveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/SalesExecutive/view')));

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
const LeaveApplicationViewPage =Loadable(lazy(() => import('pages/SuperAdmin/Leave_application/view')));

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
const EditProfilePage = Loadable(lazy(() => import('pages/Distributor/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('pages/Distributor/Profile/ChangePassword')));

//roles
const RolePage = Loadable(lazy(() => import('pages/SuperAdmin/Role')));

//customers
const CustomerPage = Loadable(lazy(() => import('pages/SuperAdmin/Customer')));
const CustomerViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Customer/view')));

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

const OrderPage = Loadable(lazy(() => import('pages/Distributor/Orders')));
const OrderViewPage = Loadable(lazy(() => import('pages/Distributor/Orders/View')));

// My Order 
const MyOrderPage = Loadable(lazy(() => import('pages/Distributor/MyOrder')));
const MyOrderCreatePage = Loadable(lazy(() => import('pages/Distributor/MyOrder/create')));
const MyOrderViewPage = Loadable(lazy(() => import('pages/Distributor/MyOrder/View')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Received/View')));

//search
const SearchPage = Loadable(lazy(() => import('pages/SuperAdmin/Search')));

//return orders
const ReturnOrderPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder/view')));


const routePrefix = '/distributor';
const DistributorRoutes = (isLoggedIn, permissions) => [
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
        path: 'sale-on-approve',
        element: <SaleOnApprovePage />
      },
      {
        path: 'sale-on-approve/view/:id',
        element: <SaleOnApproveViewPage />
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
        path: 'sales-executive/view/:id',
        element: <SalesExecutiveViewPage />
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
        path: 'return-sale',
        element: <ReturnSalePage />
      },
      {
        path: 'return-sale/view/:id',
        element: <ReturnSalePageViewPage />
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
        path: 'purchases',
        element: <PurchasePage />
      },
      {
        path: 'purchases/view/:id',
        element: <PurchaseViewPage />
      },
      {
        path: 'purchases/return/:id',
        element: <PurchaseReturnPage />
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
        path: 'suppliers',
        element: <SupplierPage />
      },
      {
        path: 'suppliers/view/:id',
        element: <SupplierViewPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'leave-applications',
        element: <LeaveApplicationPage />
      },
      {
        path: 'leave-applications/view/:id',
        element: <LeaveApplicationViewPage />
      },
      {
        path: 'expenses',
        element: <ExpensePage />,
        permission: hasPermission(permissions, 'expense', 'list')
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

export default DistributorRoutes;