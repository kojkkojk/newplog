import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './login';
import createReducer from './createReducer'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
   key:"infos",
   storage:storage
}
const rootReducer = combineReducers({
   authReducer,createReducer
});
const newRootReducer = persistReducer(persistConfig,rootReducer)

export default newRootReducer;