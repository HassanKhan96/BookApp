import { loginCred } from "../../../utils/dataTypes"
import { 
    USER_AUTH, 
    USER_AUTH_TOKEN, 
    USER_AUTH_FAILED 
} from "../../types"
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as apis from "../../../api-helpers/api.methods";
import axios from "axios";


export const userAuth = (
    authUrl: string, 
    userCred: loginCred
): ThunkAction<void, {}, unknown, AnyAction> => async dispatch => {
    dispatch({
        type: USER_AUTH
    })
    try{
        const result = await apis.post(authUrl, userCred)
        
        if(result?.data?.token){
            localStorage.setItem('token', JSON.stringify(result.data.token))
        }
        axios.defaults.headers.common['Authorization'] = `bearer ${result?.data?.token}`
        dispatch(setAuthToken(result?.data?.token))
    }
    catch(error){
        dispatch({
            type: USER_AUTH_FAILED,
            payload: error
        })
    }
}

export const setAuthToken = (payload: any = null) => {
    return {
        type: USER_AUTH_TOKEN,
        payload
    }
}
