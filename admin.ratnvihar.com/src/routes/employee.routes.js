import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import {hasPermission} from 'src/helpers/helper';

// worker
const WorkerPage = Loadable(lazy(() => import('pages/Employee/Worker')));
const WorkerCreatePage = Loadable(lazy(() => import('pages/Employee/Worker/create')));
const WorkerEditPage = Loadable(lazy(() => import('pages/Employee/Worker/edit')));
const WorkerViewPage = Loadable(lazy(() => import('pages/Employee/Worker/view')));

// StockHistoryPage
const StockHistoryPage = Loadable(lazy(() => import('pages/Employee/StockHistory')));
const StockHistoryCreatePage = Loadable(lazy(() => import('pages/Employee/StockHistory/create')));
const StockHistoryEditPage = Loadable(lazy(() => import('pages/Employee/StockHistory/edit')));

//profile
const EditProfilePage = Loadable(lazy(() => import('pages/Employee/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('pages/Employee/Profile/ChangePassword')));

/**
 * Superadmin routes
 */
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

//attendence
const AttendencePage = Loadable(lazy(() => import('pages/Se/Attendence')));

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
//const OwnSalePage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/SaleProducts')));
//const OwnSaleViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/OwnSaleView')));
const SaleProductsPage = Loadable(lazy(() => import('pages/SuperAdmin/Sale/SaleProducts')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/SaleOnApproval/view')));
const PurchaseOnApprovePage = Loadable(lazy(() => import('pages/SuperAdmin/PurchaseOnApproval')));
const PurchaseOnApproveViewPage = Loadable(lazy(() => import('pages/SuperAdmin/PurchaseOnApproval/view')));

//roles
const RolePage = Loadable(lazy(() => import('pages/SuperAdmin/Role')));

//orders
const OrderPage = Loadable(lazy(() => import('pages/SuperAdmin/Orders')));
const OrderViewPage = Loadable(lazy(() => import('pages/SuperAdmin/Orders/View')));

//customers
const CustomerPage = Loadable(lazy(() => import('pages/SuperAdmin/Customer')));

//paymenta
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

//SubscriberPage
const SubscriberPage =Loadable(lazy(() => import('pages/SuperAdmin/Subscriber')));

const routePrefix = '/employee';
const EmployeeRoutes = (isLoggedIn, permissions) => [
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
        path: 'edit-profile',
        element: <EditProfilePage />
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />
      },

      /**
       * Superadmin routes
       */
      {
        path: 'workers',
        element: <WorkerPage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'workers/create',
        element: <WorkerCreatePage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'workers/edit/:id',
        element: <WorkerEditPage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'workers/view/:id',
        element: <WorkerViewPage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'stock-histories',
        element: <StockHistoryPage />,
        permission: hasPermission(permissions, 'stock_history',  'list')
      },
      {
        path: 'stock-histories/create',
        element: <StockHistoryCreatePage />,
        permission: hasPermission(permissions, 'stock_history',  'list')
      },
      {
        path: 'stock-histories/edit/:id',
        element: <StockHistoryEditPage />,
        permission: hasPermission(permissions, 'stock_history',  'list')
      },
      {
        path: 'certificates',
        element: <CertificatePage />,
        permission: hasPermission(permissions, 'certificates',  'list')
      },
      {
        path: 'tax',
        element: <TaxPage />,
        permission: hasPermission(permissions, 'tax',  'list')
      },
      {
        path: 'units',
        element: <UnitPage />,
        permission: hasPermission(permissions, 'unit',  'list')
      },
      {
        path: 'purities',
        element: <PurityPage />,
        permission: hasPermission(permissions, 'purity',  'list')
      },
      {
        path: 'sizes',
        element: <SizePage />,
        permission: hasPermission(permissions, 'size',  'list')
      },
      {
        path: 'countries',
        element: <CountryPage />,
        permission: hasPermission(permissions, 'country',  'list')
      },
      {
        path: 'states',
        element: <StatePage />,
        permission: hasPermission(permissions, 'state',  'list')
      },
      {
        path: 'districts',
        element: <DistrictPage />,
        permission: hasPermission(permissions, 'district',  'list')
      },
      {
        path: 'return-policy',
        element: <ReturnPolicyPage />,
        permission: hasPermission(permissions, 'return_policy',  'list')
      },
      {
        path: 'holidays',
        element: <HolidayPage />,
        permission: hasPermission(permissions, 'holidays',  'list')
      },
      {
        path: 'products',
        element: <ProductPage />,
        permission: hasPermission(permissions, 'products',  'list')
      },
      {
        path: 'products/create',
        element: <ProductCreatePage />,
        permission: hasPermission(permissions, 'products',  'add')
      },
      {
        path: 'products/edit/:id',
        element: <ProductEditPage />,
        permission: hasPermission(permissions, 'products',  'edit')
      },
      {
        path: 'material-prices',
        element: <MaterialPricePage />,
        permission: hasPermission(permissions, 'price_list',  'list')
      },
      {
        path: 'material-prices/create',
        element: <MaterialPriceCreatePage />,
        permission: hasPermission(permissions, 'price_list',  'add')
      },
      {
        path: 'material-prices/edit/:id',
        element: <MaterialPriceEditPage />,
        permission: hasPermission(permissions, 'price_list',  'edit')
      },
      {
        path: 'categories',
        element: <CategoryPage />,
        permission: hasPermission(permissions, 'category',  'list')
      },
      {
        path: 'sub-categories',
        element: <SubCategoryPage />,
        permission: hasPermission(permissions, 'sub_category',  'list')
      },
      {
        path: 'materials',
        element: <MaterialPage />,
        permission: hasPermission(permissions, 'material',  'list')
      },
      {
        path: 'admins',
        element: <AdminPage />,
        permission: hasPermission(permissions, 'admin',  'list')
      },
      {
        path: 'admins/create',
        element: <AdminCreatePage />,
        permission: hasPermission(permissions, 'admin',  'add')
      },
      {
        path: 'admins/edit/:id',
        element: <AdminEditPage />,
        permission: hasPermission(permissions, 'admin',  'edit')
      },
      {
        path: 'admins/view/:id',
        element: <AdminViewPage />,
        permission: hasPermission(permissions, 'admin',  'view')
      },
      {
        path: 'distributors',
        element: <DistributorPage />,
        permission: hasPermission(permissions, 'distributor',  'list')
      },
      {
        path: 'distributors/create',
        element: <DistributorCreatePage />,
        permission: hasPermission(permissions, 'distributor',  'add')
      },
      {
        path: 'distributors/edit/:id',
        element: <DistributorEditPage />,
        permission: hasPermission(permissions, 'distributor',  'edit')
      },
      {
        path: 'retailers',
        element: <RetailerPage />,
        permission: hasPermission(permissions, 'retailer',  'list')
      },
      {
        path: 'retailers/create',
        element: <RetailerCreatePage />,
        permission: hasPermission(permissions, 'retailer',  'add')
      },
      {
        path: 'retailers/edit/:id',
        element: <RetailerEditPage />,
        permission: hasPermission(permissions, 'retailer', 'edit')
      },
      {
        path: 'retailers/view/:id',
        element: <RetailerViewPage />,
        permission: hasPermission(permissions, 'retailer', 'view')
      },
      {
        path: 'suppliers',
        element: <SupplierPage />,
        permission: hasPermission(permissions, 'supplier', 'list')
      },
      {
        path: 'suppliers/create',
        element: <SupplierCreatePage />,
        permission: hasPermission(permissions, 'supplier', 'add')
      },
      {
        path: 'suppliers/edit/:id',
        element: <SupplierEditPage />,
        permission: hasPermission(permissions, 'supplier', 'edit')
      },
      {
        path: 'suppliers/view/:id',
        element: <SupplierViewPage />,
        permission: hasPermission(permissions, 'supplier', 'view')
      },
      {
        path: 'customers',
        element: <CustomerPage />,
        permission: hasPermission(permissions, 'customer', 'list')
      },
      {
        path: 'sales-executive',
        element: <SalesExecutivePage />,
        permission: hasPermission(permissions, 'sales_executive', 'list')
      },
      {
        path: 'sales-executive/create',
        element: <SalesExecutiveCreatePage />,
        permission: hasPermission(permissions, 'sales_executive', 'add')
      },
      {
        path: 'sales-executive/edit/:id',
        element: <SalesExecutiveEditPage />,
        permission: hasPermission(permissions, 'sales_executive', 'edit')
      },
      {
        path: 'employees',
        element: <EmployeePage />,
        permission: hasPermission(permissions, 'employees', 'list')
      },
      {
        path: 'employees/create',
        element: <EmployeeCreatePage />,
        permission: hasPermission(permissions, 'employees', 'add')
      },
      {
        path: 'employees/edit/:id',
        element: <EmployeeEditPage />,
        permission: hasPermission(permissions, 'employees', 'edit')
      },
      {
        path: 'employees/view/:id',
        element: <EmployeeViewPage />,
        permission: hasPermission(permissions, 'employees', 'view')
      },
      {
        path: 'roles',
        element: <RolePage />,
        permission: hasPermission(permissions, 'roles', 'list')
      },
      {
        path: 'loans',
        element: <LoanPage />,
        permission: hasPermission(permissions, 'loans', 'list')
      },
      {
        path: 'loans/view/:id',
        element: <LoanViewPage />,
        permission: hasPermission(permissions, 'loans', 'view')
      },
      {
        path: 'investors',
        element: <InvestorPage />,
        permission: hasPermission(permissions, 'investors', 'list')
      },
      {
        path: 'investors/create',
        element: <InvestorCreatePage />,
        permission: hasPermission(permissions, 'investors', 'add')
      },
      {
        path: 'investors/edit/:id',
        element: <InvestorEditPage />,
        permission: hasPermission(permissions, 'investors', 'edit')
      },
      {
        path: 'stocks',
        element: <StocksPage />,
        permission: hasPermission(permissions, 'stock', 'list')
      },
      {
        path: 'stocks/view/:id',
        element: <StocksViewPage />,
        permission: hasPermission(permissions, 'stock', 'view')
      },
      {
        path: 'purchases',
        element: <PurchasePage />,
        permission: hasPermission(permissions, 'purchase', 'list')
      },
      {
        path: 'purchase-products',
        element: <PurchaseProductsPage />,
        permission: hasPermission(permissions, 'purchase', 'list')
      },
      {
        path: 'purchases/create',
        element: <PurchaseCreatePage />,
        permission: hasPermission(permissions, 'purchase', 'add')
      },
      {
        path: 'purchases/edit/:id',
        element: <PurchaseEditPage />,
        permission: hasPermission(permissions, 'purchase', 'edit')
      },
      {
        path: 'purchases/view/:id',
        element: <PurchaseViewPage />,
        permission: hasPermission(permissions, 'purchase', 'view')
      },
      {
        path: 'purchases/all-view/:id',
        element: <PurchaseAllViewPage />,
        permission: hasPermission(permissions, 'purchase', 'view')
      },
      {
        path: 'purchases/return/:id',
        element: <PurchaseReturnPage />,
        permission: hasPermission(permissions, 'return_purchase', 'view')
      },
      {
        path: 'sales',
        element: <SalePage />,
        permission: hasPermission(permissions, 'sales', 'list')
      },
      {
        path: 'sale-products',
        element: <SaleProductsPage />,
        permission: hasPermission(permissions, 'sales', 'list')
      },
      {
        path: 'sales/create',
        element: <SaleCreatePage />,
        permission: hasPermission(permissions, 'sales', 'add')
      },
      {
        path: 'sales/view/:id',
        element: <SaleViewPage />,
        permission: hasPermission(permissions, 'sales', 'view')
      },
      {
        path: 'sale-on-approve',
        element: <SaleOnApprovePage />,
        permission: hasPermission(permissions, 'sale_on_approval', 'list')
      },
      {
        path: 'sale-on-approve/view/:id',
        element: <SaleOnApproveViewPage />,
        permission: hasPermission(permissions, 'sale_on_approval', 'view')
      },
      {
        path: 'purchase-on-approve',
        element: <PurchaseOnApprovePage />,
        permission: hasPermission(permissions, 'purchase_on_approval', 'list')
      },
      {
        path: 'purchase-on-approve/view/:id',
        element: <PurchaseOnApproveViewPage />,
        permission: hasPermission(permissions, 'purchase_on_approval', 'view')
      },
      {
        path: 'return-purchase',
        element: <ReturnPurchasePage />,
        permission: hasPermission(permissions, 'return_purchase', 'list')
      },
      {
        path: 'return-purchase/view/:id',
        element: <ReturnPurchaseViewPage />,
        permission: hasPermission(permissions, 'return_purchase', 'view')
      },
      {
        path: 'return-sale',
        element: <ReturnSalePage />,
        permission: hasPermission(permissions, 'return_sale', 'list')
      },
      {
        path: 'return-sale/view/:id',
        element: <ReturnSalePageViewPage />,
        permission: hasPermission(permissions, 'return_sale', 'view')
      },
      {
        path: 'search',
        element: <SearchPage />,
        permission: hasPermission(permissions, ['purchase', 'sales'], ['list', 'view'])
      },
      {
        path: 'wallet-history',
        element: <WalletPage />,
        permission: hasPermission(permissions, ['purchase', 'sales'], ['list', 'view'])
      },
      {
        path: 'orders',
        element: <OrderPage />,
        permission: hasPermission(permissions, 'orders', 'list')
      },
      {
        path: 'orders/view/:id',
        element: <OrderViewPage />,
        permission: hasPermission(permissions, 'orders', 'view')
      },
      {
        path: 'return-orders',
        element: <ReturnOrderPage />,
        permission: hasPermission(permissions, 'return_orders', 'list')
      },
      {
        path: 'return-orders/view/:id',
        element: <ReturnOrderViewPage />,
        permission: hasPermission(permissions, 'return_orders', 'view')
      },
      {
        path: 'promocodes',
        element: <PromocodePage />,
        permission: hasPermission(permissions, 'promocodes', 'list')
      },
      {
        path: 'promocodes/create',
        element: <PromocodeCreatePage />,
        permission: hasPermission(permissions, 'promocodes', 'add')
      },
      {
        path: 'promocodes/edit/:id',
        element: <PromocodeEditPage />,
        permission: hasPermission(permissions, 'promocodes', 'edit')
      },
      {
        path: 'banners',
        element: <BannerPage />,
        permission: hasPermission(permissions, 'banners', 'list')
      },
      {
        path: 'leave-applications',
        element: <LeaveApplicationPage />,
        permission: hasPermission(permissions, 'leave_applications', 'list')
      },
      {
        path: 'leave-applications/view/:id',
        element: <LeaveApplicationViewPage />,
        permission: hasPermission(permissions, 'leave_applications', 'view')
      },
      {
        path: 'expenses',
        element: <ExpensePage />,
        permission: hasPermission(permissions, 'expense', 'list')
      },
      {
        path: 'material-stocks',
        element: <MaterialStocksPage />,
        permission: hasPermission(permissions, 'material_stock', 'list')
      },
      {
        path: 'material-stocks/view/:id',
        element: <MaterialStocksViewPage />,
        permission: hasPermission(permissions, 'material_stock', 'view')
      },
      {
        path: 'material-stock-history',
        element: <MaterialStocksHistoryPage />,
        permission: hasPermission(permissions, 'material_stock_history', 'list')
      },
      {
        path: 'transfer',
        element: <TransferPage />,
        permission: hasPermission(permissions, 'transfer', 'list')
      },
      {
        path: 'transfer/view/:id',
        element: <TransferViewPage />,
        permission: hasPermission(permissions, 'transfer', 'view')
      },
      {
        path: 'received',
        element: <ReceivedPage />,
        permission: hasPermission(permissions, 'received', 'list')
      },
      {
        path: 'received/view/:id',
        element: <ReceivedViewPage />,
        permission: hasPermission(permissions, 'received', 'view')
      },
      {
        path: 'subscribers',
        element: <SubscriberPage />,
        permission: hasPermission(permissions, 'subscribers', 'list')
      },
      {
        path: 'attendence',
        element: <AttendencePage />
      },
    ]
  }
];


export default EmployeeRoutes;