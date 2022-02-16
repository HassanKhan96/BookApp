import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Payment from '../screens/Payment';


export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/payment',
        component: Payment
    }
]