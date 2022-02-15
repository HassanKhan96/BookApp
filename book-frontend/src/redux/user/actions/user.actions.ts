import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as apis from '../../../api-helpers/api.methods';
import * as URL from '../../../api-helpers/apiUrls';
import { GET_USER, GET_USER_FAILED, GET_USER_SUCCESS } from '../../types';

export const getUser = (): ThunkAction<void, {}, unknown, AnyAction> => async dispatch => {
    try{
        dispatch({
            type: GET_USER
        })

        const result = await apis.get(URL.GET_USER_URL);
        dispatch(setUser(result?.data))
    }
    catch(error){
        dispatch({
            type: GET_USER_FAILED,
            payload: error
        })
    }
}

export const setUser = (payload: any) => {
    return {
        type: GET_USER_SUCCESS,
        payload
    }
}