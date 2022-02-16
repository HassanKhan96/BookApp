import './css/Loading.css';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../redux/user/actions/user.actions';

const Loading = (): JSX.Element => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser())
    },[])

    return (
        <div className="loading-container border">
            <Spinner animation='border' style={{ color: 'blue' }} />
            <span>Please wait</span>
        </div>
    );
}

export default Loading;