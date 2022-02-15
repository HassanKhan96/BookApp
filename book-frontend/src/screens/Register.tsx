import React, { FC, useEffect, useState } from "react";
import "./css/Login.css";
import Field from "../components/Field/Field";
import Button from "../components/button/Button";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import { registerCred } from '../utils/dataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth, setAuthToken } from "../redux/auth/actions/Auth.actions";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { REGISTER_URL } from "../api-helpers/apiUrls";

const Register: FC = () => {
    const [ userCred, setUserCred] = useState<registerCred>({ email: '', password: '', name: '' })
    const [validated, setValidated] = useState<boolean>(false);
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.auth.token);
    const location = useLocation();

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        
        dispatch(userAuth(REGISTER_URL,userCred))
        setValidated(true);
    };

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if(localToken){
            dispatch(setAuthToken(localToken))
        }
    },[])


    if(token){
        return <Navigate to="/" state={{ from: location }} replace/>
    }

    
    return (
        <div className="main-container">
            <div className="container">
                <div className="row row-container justify-content-center align-items-center">
                    <div className="col-sm-4">
                        <div className="card auth-card rounder">
                            <div className="logo d-flex justify-content-center align-items-center pe-2 mb-2 mt-5">
                                <AiOutlineUserAdd 
                                    size={35}
                                />
                                <span>Register</span>
                            </div>
                            <div className="content-area px-4 mt-2">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Field 
                                        label="Name"
                                        placeholder="Enter your full name"
                                        type="text"
                                        onChange={e => setUserCred(prev => ({...prev, name: e.target.value}))}
                                    />
                                    <Field 
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                        onChange={e => setUserCred(prev => ({...prev, email: e.target.value}))}
                                    />
                                    <Field 
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        onChange={e => setUserCred(prev => ({...prev, password: e.target.value}))}
                                    />

                                    <Button
                                        className="btn btn-info mt-2"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </Form>
                                <div className="bottom-text mt-2">
                                    Already have an account? <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;