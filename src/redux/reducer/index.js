import { combineReducers } from 'redux';
import authReducer from './login';

const rootReducer = combineReducers({
   authReducer
});

export default rootReducer;