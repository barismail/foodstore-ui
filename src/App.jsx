import React from "react";
import {createHashRouter, RouterProvider} from 'react-router-dom'
import 'upkit/dist/style.min.css'
import {listen} from './app/listener.js';
import Home from './pages/Home'
import Register from './pages/Register'
import RegisterSuccess from './pages/RegisterSuccess'
import Login from './pages/Login'
import {getCart} from "./api/cart.js";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserAddress from "./pages/UserAddress";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import UserAccount from "./pages/UserAccount";
import UserOrders from "./pages/UserOrders";
import Logout from "./pages/Logout";
import GuardRoute from "./components/GuardRoute";
import NotFound from "./pages/NotFound";

const router = createHashRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <NotFound />
    },
    {
        path: '/register/berhasil',
        element: (
            <GuardRoute>
                <RegisterSuccess />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        path: '/alamat-pengiriman',
        element: (
            <GuardRoute>
                <UserAddress />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/alamat-pengiriman/tambah',
        element: (
            <GuardRoute>
                <UserAddressAdd />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/checkout',
        element: (
            <GuardRoute>
                <Checkout />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/invoice/:order_id',
        element: (
            <GuardRoute>
                <Invoice />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/account',
        element: (
            <GuardRoute>
                <UserAccount />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/pesanan',
        element: (
            <GuardRoute>
                <UserOrders />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/logout',
        element: (
            <GuardRoute>
                <Logout />
            </GuardRoute>
        ),
        errorElement: <NotFound />
    }
]);

function App() {
    React.useEffect(() => {
        getCart();
        listen();
    }, []);

  return <RouterProvider router={router} />
}

export default App
