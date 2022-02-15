import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from '../components/navbar/Navbar';
import { getUser } from "../redux/user/actions/user.actions";
import { useEffect, useLayoutEffect } from 'react';
import { setAuthToken } from "../redux/auth/actions/Auth.actions";
import Loading from "./Loading";

const Home = (): JSX.Element => {
    const location = useLocation();
    const { auth, user } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useLayoutEffect(() => {
        if(token !== '' && token){
            dispatch(setAuthToken(token))   
        }        
    }, [])

    useEffect(() => {
        dispatch(getUser())
    },[])

    
    if (!token) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if(!user.loading){
        return <Loading />
    }
    return (
        <div>
            <NavbarComponent />
        </div>
    )


}

export default Home;