import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './login';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
   key:"infos",
   storage:storage
}
const rootReducer = combineReducers({
   authReducer
});
const newRootReducer = persistReducer(persistConfig,rootReducer)

export default newRootReducer;