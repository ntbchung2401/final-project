import AdminRoute from '~/components/AdminRoute';
import ProtectedRoute from '~/components/ProtectedRoute';
import AddressScreen from '~/components/screens/AddressScreen';
import CartScreen from '~/components/screens/CartScreen';
import CreateProductScreen from '~/components/screens/CreateProductScreen';
import DashboardScreen from '~/components/screens/DashboardScreen';
import ProductEditScreen from '~/components/screens/EditProductScreen';
import HomeScreen from '~/components/screens/HomeScreen';
import LoginScreen from '~/components/screens/LoginScreen';
import OrderHistoryScreen from '~/components/screens/OrderHistoryScreen';
import OrderListScreen from '~/components/screens/OrderListScreen';
import OrderScreen from '~/components/screens/OrderScreen';
import PaymentScreen from '~/components/screens/PaymentScreen';
import PreviewOrderScreen from '~/components/screens/PreviewOrderScreen';
import ProductListScreen from '~/components/screens/ProductListScreen';
import ProductScreen from '~/components/screens/ProductScreen';
import ProfileScreen from '~/components/screens/ProfileScreen';
import RegisterScreen from '~/components/screens/RegisterScreen';
import SearchScreen from '~/components/screens/SearchScreen';
import UserEditScreen from '~/components/screens/UserEditScreen';
import UserListScreen from '~/components/screens/UserListScreen';

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
    { path: '/admin/productlist', component: ProductListScreen, role: AdminRoute },
    { path: '/admin/order/:id', component: OrderScreen, role: AdminRoute },
    { path: '/admin/orderlist', component: OrderListScreen, role: AdminRoute },
    { path: '/admin/userlist', component: UserListScreen, role: AdminRoute },
    { path: '/admin/user/:id', component: UserEditScreen, role: AdminRoute },
    { path: '/orderhistory', component: OrderHistoryScreen, role: ProtectedRoute },
    { path: '/order/:id', component: OrderScreen, role: ProtectedRoute },
    { path: '/profile', component: ProfileScreen, role: ProtectedRoute },
];

export { publicRoutes, privateRoutes };