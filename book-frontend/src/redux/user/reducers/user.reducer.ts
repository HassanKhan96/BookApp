import { GET_USER, GET_USER_FAILED, GET_USER_SUCCESS } from "../../types";

const INITIAL_STATE = {
    data: null,
    loading: false,
    error: null
}

export const user = (state=INITIAL_STATE, action: any) => {
    switch(action.type){
        case GET_USER:
            return { 
                ...state,
                ...INITIAL_STATE,
                loading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                data: action.payload
            }
        case GET_USER_FAILED:
            return {
                ...state,
                ...INITIAL_STATE,
                error: action.payload
            }
        default:
            return state;
    }
}