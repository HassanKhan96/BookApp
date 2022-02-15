import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from '../components/navbar/Navbar';
import { getUser } from "../redux/user/actions/user.actions";
import { useEffect, useLayoutEffect } from 'react';

const Home = (): JSX.Element => {
    const location = useLocation();
    const { auth, user } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     const rawToken = localStorage.getItem('token');
    //     if(rawToken){
    //         dispatch(setAuthToken(rawToken))
    //     }
    // },[])
    
    

    useLayoutEffect(() => {
        dispatch(getUser())
    },[])

    if(!auth?.token){
        return <Navigate to='/login' state={{ from: location }} replace/>;
    }
    else{
        return (
            <div>
                <NavbarComponent />
            </div>
        )
    }
        
}

export default Home;