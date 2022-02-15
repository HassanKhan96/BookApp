import { 
    USER_AUTH,
    USER_AUTH_TOKEN,
    USER_AUTH_FAILED
} from "../../types";

const  INITIAL_STATE = {
    token: null,
    loading: false,
    error: null
}

export const auth = (state=INITIAL_STATE, action: any) => {
    switch(action.type){
        case USER_AUTH:
            return { ...state, loading: true }
        case USER_AUTH_TOKEN:
            return {
                ...state, 
                ...INITIAL_STATE, 
                token: action.payload
            }
        case USER_AUTH_FAILED:
            return {
                ...state,
                ...INITIAL_STATE,
                error: action.payload
            }
        default:
            return state;
    }
}