import AdminRoute from '~/components/AdminRoute';
import ProtectedRoute from '~/components/ProtectedRoute';
import AddressScreen from '~/components/screens/CartAction/AddressScreen';
import CartScreen from '~/components/screens/CartAction/CartScreen';
import CreateProductScreen from '~/components/screens/ManageProduct/CreateProductScreen';
import DashboardScreen from '~/components/screens/AdminField/DashboardScreen';
import ProductEditScreen from '~/components/screens/ManageProduct/EditProductScreen';
import HomeScreen from '~/components/screens/HomePage/HomeScreen';
import LoginScreen from '~/components/screens/UserField/LoginScreen';
import CreateCategoryScreen from '~/components/screens/ManageCategory/CreateCategory';
import EditCategory from '~/components/screens/ManageCategory/EditCategory';
import ManageCategory from '~/components/screens/ManageCategory/ListCategory';
import OrderHistoryScreen from '~/components/screens/UserField/OrderHistoryScreen';
import OrderListScreen from '~/components/screens/AdminField/OrderListScreen';
import OrderScreen from '~/components/screens/OrderAction/OrderScreen';
import PaymentScreen from '~/components/screens/CartAction/PaymentScreen';
import PreviewOrderScreen from '~/components/screens/OrderAction/PreviewOrderScreen';
import ProductListScreen from '~/components/screens/ManageProduct/ProductListScreen';
import ProductScreen from '~/components/screens/ProductDetail/ProductScreen';
import ProfileScreen from '~/components/screens/UserField/ProfileScreen';
import RegisterScreen from '~/components/screens/UserField/RegisterScreen';
import SearchScreen from '~/components/screens/Search/SearchScreen';
import UserEditScreen from '~/components/screens/ManageUser/UserEditScreen';
import UserListScreen from '~/components/screens/ManageUser/UserListScreen';
import ManageBrand from '~/components/screens/ManageBrand/ListBrand';
import CreateBrandScreen from '~/components/screens/ManageBrand/CreateBrand';
import EditBrand from '~/components/screens/ManageBrand/EditBrand';

//public Routes
const publicRoutes = [
    { path: '/', component: HomeScreen },
    { path: '/login', component: LoginScreen },
    { path: '/register', component: RegisterScreen },
    { path: '/cart', component: CartScreen },
    { path: '//product/:display', component: ProductScreen },
    { path: '/address', component: AddressScreen },
    { path: '/payment', component: PaymentScreen },
    { path: '/previeworder', component: PreviewOrderScreen },
    { path: '/search', component: SearchScreen },
    
];
const privateRoutes = [
    { path: '/admin/dashboard', component: DashboardScreen, role: AdminRoute },
    { path: '/admin/product/:id', component: ProductEditScreen, role: AdminRoute },
    { path: '/admin/createproduct', component: CreateProductScreen, role: AdminRoute },
    { path: '/admin/createCategory', component: CreateCategoryScreen, role: AdminRoute },
    { path: '/admin/createBrand', component: CreateBrandScreen, role: AdminRoute },

    { path: '/admin/manageCategory', component: ManageCategory, role: AdminRoute },
    { path: '/admin/manageBrand', component: ManageBrand, role: AdminRoute },
    { path: '/admin/productlist', component: ProductListScreen, role: AdminRoute },

    { path: '/admin/order/:id', component: OrderScreen, role: AdminRoute },
    { path: '/admin/brands/:id', component: EditBrand, role: AdminRoute },
    { path: '/admin/categories/:id', component: EditCategory, role: AdminRoute },
    { path: '/admin/orderlist', component: OrderListScreen, role: AdminRoute },
    { path: '/admin/userlist', component: UserListScreen, role: AdminRoute },
    { path: '/admin/user/:id', component: UserEditScreen, role: AdminRoute },
    { path: '/orderhistory', component: OrderHistoryScreen, role: ProtectedRoute },
    { path: '/order/:id', component: OrderScreen, role: ProtectedRoute },
    { path: '/profile', component: ProfileScreen, role: ProtectedRoute },
];

export { publicRoutes, privateRoutes };
