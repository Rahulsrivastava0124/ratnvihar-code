import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const LoginPage = Loadable(lazy(() => import('pages/SuperAdmin/Auth/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('pages/SuperAdmin/Auth/ForgotPassword')));
const DashboardPage = Loadable(lazy(() => import('pages/SuperAdmin/Dashboard')));
const CertificatePage = Loadable(lazy(() => import('pages/SuperAdmin/Certificate')));
const CategoryPage = Loadable(lazy(() => import('pages/SuperAdmin/Category')));
//const CertificateEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Certificate/edit')));
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
const ProductViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Product/view')));

// Promocode
const PromocodePage = Loadable(lazy(() => import('pages/SuperAdmin/Promocode')));
const PromocodeCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Promocode/create')));
const PromocodeEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Promocode/edit')));

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

//material stocks
const MaterialStocksPage =Loadable(lazy(() => import('pages/SuperAdmin/MaterialStocks')));
const MaterialStocksViewPage = Loadable(lazy(() => import('pages/SuperAdmin/MaterialStocks/view')));
const MaterialStocksHistoryPage = Loadable(lazy(() => import('pages/SuperAdmin/MaterialStocks/history')));

//purchase
const PurchasePage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase')));
const PurchaseCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/create')));
const PurchaseEditPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/edit')));
const PurchaseViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/view')));
const PurchaseAllViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/AllView')));
const PurchaseReturnPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/return')));
const PurchaseProductsPage = Loadable(lazy(() => import('pages/SuperAdmin/Purchase/PurchaseProducts')));

//loan
const LoanPage = Loadable(lazy(() => import('pages/SuperAdmin/Loans')));
const LoanViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Loans/view')));

//sales
const SalePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/create')));
const SaleViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/view')));
//const OwnSalePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/OwnSale')));
//const OwnSaleViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/OwnSaleView')));
const SaleProductsPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/SaleProducts')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval/view')));
const PurchaseOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/PurchaseOnApproval')));
const PurchaseOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/PurchaseOnApproval/view')));

//profile
const EditProfilePage = Loadable(lazy(() => import('pages/SuperAdmin/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('pages/SuperAdmin/Profile/ChangePassword')));

//roles
const RolePage = Loadable(lazy(() => import('pages/SuperAdmin/Role')));
const RolePermissionPage = Loadable(lazy(() => import('pages/SuperAdmin/Role/permission')));

//orders
const OrderPage = Loadable(lazy(() => import('pages/SuperAdmin/Orders')));
const OrderViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Orders/View')));

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

//banners
const BannerPage = Loadable(lazy(() => import('pages/SuperAdmin/Banner')));

//search
const SearchPage = Loadable(lazy(() => import('pages/SuperAdmin/Search')));

//return orders
const ReturnOrderPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnOrder/view')));

//holiday
const HolidayPage = Loadable(lazy(() => import('pages/SuperAdmin/Holiday')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Transfer/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Received/View')));

//salary 
const SalaryPage = Loadable(lazy(() => import('pages/SuperAdmin/Salary')));
const SalaryHistoryPage = Loadable(lazy(() => import('pages/SuperAdmin/Salary/History')));

//return stocks
const ReturnStocksPage =Loadable(lazy(() => import('pages/SuperAdmin/ReturnStocks')));
const ReturnStocksViewPage = Loadable(lazy(() => import('pages/SuperAdmin/ReturnStocks/view')));

//SubscriberPage
const SubscriberPage =Loadable(lazy(() => import('pages/SuperAdmin/Subscriber')));

const routePrefix = '/super-admin';
const SuperAdminRoutes = (isLoggedIn) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/super-admin/login" />,
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
        path: 'certificates',
        element: <CertificatePage />
      },
      {
        path: 'banners',
        element: <BannerPage />
      },
      {
        path: 'categories',
        element: <CategoryPage />
      },
      {
        path: 'sub-categories',
        element: <SubCategoryPage />
      },
      {
        path: 'tax',
        element: <TaxPage />
      },
      {
        path: 'units',
        element: <UnitPage />
      },
      {
        path: 'purities',
        element: <PurityPage />
      },
      {
        path: 'sizes',
        element: <SizePage />
      },
      {
        path: 'materials',
        element: <MaterialPage />
      },
      {
        path: 'products',
        element: <ProductPage />
      },
      {
        path: 'products/create',
        element: <ProductCreatePage />
      },
      {
        path: 'products/edit/:id',
        element: <ProductEditPage />
      },
      {
        path: 'products/view/:id',
        element: <ProductViewPage />
      },
      {
        path: 'promocodes',
        element: <PromocodePage />
      },
      {
        path: 'promocodes/create',
        element: <PromocodeCreatePage />
      },
      {
        path: 'promocodes/edit/:id',
        element: <PromocodeEditPage />
      },
      {
        path: 'countries',
        element: <CountryPage />
      },
      {
        path: 'states',
        element: <StatePage />
      },
      {
        path: 'districts',
        element: <DistrictPage />
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
        path: 'admins',
        element: <AdminPage />
      },
      {
        path: 'admins/create',
        element: <AdminCreatePage />
      },
      {
        path: 'admins/edit/:id',
        element: <AdminEditPage />
      },
      {
        path: 'admins/view/:id',
        element: <AdminViewPage />
      },
      {
        path: 'distributors',
        element: <DistributorPage />
      },
      {
        path: 'distributors/create',
        element: <DistributorCreatePage />
      },
      {
        path: 'distributors/edit/:id',
        element: <DistributorEditPage />
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
        path: 'employees',
        element: <EmployeePage />
      },
      {
        path: 'employees/create',
        element: <EmployeeCreatePage />
      },
      {
        path: 'employees/edit/:id',
        element: <EmployeeEditPage />
      },
      {
        path: 'employees/view/:id',
        element: <EmployeeViewPage />
      },
      /*{
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
      },*/
      {
        path: 'material-prices',
        element: <MaterialPricePage />
      },
      {
        path: 'material-prices/create',
        element: <MaterialPriceCreatePage />
      },
      {
        path: 'material-prices/edit/:id',
        element: <MaterialPriceEditPage />
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
        path: 'purchases/all-view/:id',
        element: <PurchaseAllViewPage />
      },
      {
        path: 'purchase-products',
        element: <PurchaseProductsPage />
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
        path: 'sale-products',
        element: <SaleProductsPage />
      },
      {
        path: 'sales/create',
        element: <SaleCreatePage />
      },
      {
        path: 'sales/view/:id',
        element: <SaleViewPage />
      },
      // {
      //   path: 'own-sales',
      //   element: <OwnSalePage />
      // },
      // {
      //   path: 'own-sales/view/:id',
      //   element: <OwnSaleViewPage />
      // },
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
        path: 'roles/permissions/:id',
        element: <RolePermissionPage />
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
        path: 'sales-executive/create',
        element: <SalesExecutiveCreatePage />
      },
      {
        path: 'sales-executive/edit/:id',
        element: <SalesExecutiveEditPage />
      },
      {
        path: 'customers',
        element: <CustomerPage />
      },
      {
        path: 'customers/view/:id',
        element: <CustomerViewPage />
      },
      /*{
        path: 'payments',
        element: <PaymentPage />
      },*/
      {
        path: 'sale-on-approve',
        element: <SaleOnApprovePage />
      },
      {
        path: 'wallet-history',
        element: <WalletPage />
      },
      {
        path: 'sale-on-approve/view/:id',
        element: <SaleOnApproveViewPage />
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
        path: 'holidays',
        element: <HolidayPage />
      },
      {
        path: 'material-stocks',
        element: <MaterialStocksPage />
      },
      {
        path: 'material-stocks/view/:id',
        element: <MaterialStocksViewPage />
      },
      {
        path: 'material-stock-history',
        element: <MaterialStocksHistoryPage />
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
        path: 'salary',
        element: <SalaryPage />
      },
      {
        path: 'salary/history/:id',
        element: <SalaryHistoryPage />
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
        path: 'subscribers',
        element: <SubscriberPage />
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

export default SuperAdminRoutes;