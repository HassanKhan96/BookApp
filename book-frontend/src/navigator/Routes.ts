import Home from "../screens/Home";
import Login from "../screens/Login";
import Pricing from "../screens/Pricing";
import Register from "../screens/Register";


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
        path: '/pricing',
        component: Pricing
    }
]