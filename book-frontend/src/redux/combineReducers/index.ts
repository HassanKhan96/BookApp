import { combineReducers } from 'redux';
import { auth } from '../auth/reducers/auth.reducer';
import { user } from '../user/reducers/user.reducer';

export default combineReducers({
    auth,
    user
})