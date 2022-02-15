
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'
import reducers from './combineReducers';

export const store = createStore(reducers,applyMiddleware(reduxThunk))

export type RootState = ReturnType<typeof store.getState>